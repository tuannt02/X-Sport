const Customer = require('../models/Customer');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Address = require('../models/Address');
const Order = require('../models/Order');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');


const jwt = require('jsonwebtoken');


const handleErrors = (err) => {
    // console.log(err.message, err.code);

    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email này chưa được đăng ký';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Mật khẩu vừa nhập không đúng';
    }


    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email đã tồn tại';
        return errors;
    }


    // validation error
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'tuannt', {
        expiresIn: maxAge,
    })
}

class UserController {



    // [GET] /sign_in
    sign_in(req, res) {
        res.render('user/sign_in', { layout: 'sign_in' });
    }

    // [POST] /sign_in
    async sign_in_post(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            if(user.type == 1)  {
                res.redirect('/');
            }
            else    {
                res.redirect('/admin/create-product');
            }
        }
        catch (err) {
            const errors = handleErrors(err);

            res.render('user/sign_in',
                {
                    layout: 'sign_in',
                    err: errors,
                })
        }
    }

    // [POST] /sign_in -> authenticate
    authenticate(req, res, next) {

        const username = req.body.username;
        const password = req.body.password;

        Customer.findOne({
            username: username,
            password: password
        })
            .then(data => {
                if (!data) {
                    return res.status(400).send("Wrong password");
                }
                else {
                    const token = jwt.sign({ username: data.username }, 'tuannt', { expiresIn: '1h' })
                    res.cookie('token', token);

                    next();
                }
            })
            .catch(err => {
                res.status(500).json('Lỗi server');
            });


    }

    // Middleware isAuthen
    isAuthen(req, res, next) {
        try {
            const token = req.cookies.token;
            const parserToken = jwt.verify(token, 'tuannt');


            if (parserToken) {
                return res.redirect('http://localhost:3001/');
            }
            else {
                res.clearCookie('token');
                return res.redirect('http://localhost:3001/user/login');
            }
        }
        catch {
            next();
        }


    }


    // [GET] /sign_up
    sign_up(req, res) {
        res.render('user/sign_up', { layout: 'sign_up' });
    }

    // [POST /sign_up
    async sign_up_post(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.create({
                email,
                password,
                name: 'username',
                type: 1,
            });
            res.render('user/sign_up',
                {
                    layout: 'sign_up',
                    data: {
                        status: true,
                        err: false,
                        mes: 'Tạo tài khoản thành công, vui lòng đăng nhập',
                    }
                });
        }
        catch (err) {
            const errors = handleErrors(err);
            res.render('user/sign_up',
                {
                    layout: 'sign_up',
                    data: {
                        status: false,
                        err: true,
                        mes: errors,
                    }
                });
        }
    }


    // [GET] /forget_password
    forget_password(req, res) {
        res.render('user/forget_password', { layout: 'forget_password' });
    }


    // [GET] /account/:slug
    async account(req, res, next) {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }

        //const user_id = user._id;

        var slug = req.params.slug;
        if (slug == 'profile') {
            res.render('partials/user/account/profile',
                {
                    layout: 'user_info',
                    val: slug,
                    user: user,
                })
            return;
        }

        if (slug == 'address') {

            try {
                const list_addr = await Address.find({ user_id: user._id }).exec();

                res.render('partials/user/account/address',
                    {
                        layout: 'user_info',
                        val: slug,
                        user: user,
                        list_addr: mutipleMongooseToObject(list_addr),
                    });
            }
            catch (err) {

            }

        }

        if (slug == 'password') {
            res.render('partials/user/account/password',
                {
                    layout: 'user_info',
                    val: slug,
                    user: user,
                });
            return;
        }

        //next();
    }


    // [POST] /account/address  
    async postAddr(req, res, next) {
        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }
        const data = req.body;
        data.user_id = user._id;


        try {
            const newAddr = await Address.create(data);
            res.json({
                status: 200,
                mes: 'Thành công',
            });
        }
        catch (err) {
            res.json({
                status: 404,
                mes: 'Thất bại',
            })
        }

    }

    // [POST] /account/address/default_addr
    async default_addr(req, res, next) {
        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }
        const data = req.body;
        data.user_id = user._id;


        Address.updateMany({ user_id: data.user_id }, { $set: { is_default: false } })
            .then(function () {
                Address.updateOne({ _id: data.addr_id }, { $set: { is_default: true } })
                    .then(function () {
                        res.json({
                            status: 200,
                            mes: 'Cập nhập địa chỉ giao hàng mặc định thành công',
                        })
                    })
                    .catch(function (err) {

                    })
            })
            .catch(function (err) {

            })


    }

    async del_addr(req, res, next) {
        const data = req.body;

        Address.deleteOne({ _id: data.addr_id })
            .then(() => res.json({
                status: 200,
                mes: 'Xóa thành công',
            }))
            .catch(next);
    }

    // [GET] /purchase  
    purchase(req, res, next) {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }

        var cartComplete;
        Cart.find({ userID: user._id, isComplete: true }).populate('productID')
            .then(cart => {
                cartComplete = mutipleMongooseToObject(cart);
                Order.find({ userID: user._id }).populate('cartID').sort({datePurChase: -1})
                    .then(order => {
                        res.render('partials/user/purchase/purchase',
                            {
                                layout: 'user_info',
                                order: mutipleMongooseToObject(order),
                                cartComplete: cartComplete,
                                val: 'purchase',
                                user: user,
                            });
                    })
                    .catch(next);
            })
            .catch(next);
    }



    // [GET] /notifications
    notifications(req, res, next) {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }

        res.render('partials/user/notifications/notifications',
            {
                layout: 'user_info',
                val: 'notifications',
                user: user,
            });
    }

    //[GET] /user/cart
    cart(req, res, next) {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }

        Cart.find({ userID: user._id, isComplete: false }).populate('productID')
            .then(cart => {
                res.render('user/cart', { cart: mutipleMongooseToObject(cart), user: user, });
            })
            .catch(next);
    }

    // [POST] /user/add-to-cart
    addToCart(req, res, next) {
        const cart = new Cart(req.body);
        cart.save()
            .then(() => res.json(req.body))
            .catch(next);
    }

    //[DELETE] /user/cart/:id
    removeCart(req, res, next) {
        Cart.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PUT] /user/edit-quantity
    updateQuantityProduct(req, res, next) {
        Cart.updateOne({ _id: req.body.id }, { $set: { quantity: req.body.quantity } })
            .then(() => res.send('success'))
            .catch(next);
    }


    //[GET] /user/checkout
    checkout(req, res, next) {
        var user;
        var address;

        try {
            user = mongooseToObject(res.locals.user);
        }
        catch {
            user = '';
        }
        var list = req.query.listID.split(",")
        Address.findOne({ user_id: user._id, is_default: true })
            .then(Address => {
                address = mongooseToObject(Address);
                Cart.find({ _id: { $in: list } }).populate('productID')
                    .then((cart) => {
                        res.render('user/checkout', { layout: 'checkout', cart: mutipleMongooseToObject(cart), address: address, user: user, })
                    })
                    .catch(next);
            })

    }


    //[POST] /user/order
    storeOrder(req, res, next) {
        const listCart = req.body.cartID;
        const order = new Order(req.body);

        Cart.updateMany({ _id: { $in: listCart } }, { $set: { isComplete: true } })
            .then(() => {
                order.save()
                    .then(() => res.send('success'))
                    .catch(next);
            })
            .catch(next);
    }


    // [GET] /
    // -> isLogin == true ? ->homePage : -> loginPage
    rerouting(req, res) {
        res.redirect('http://localhost:3001/user/login');
    }
}

module.exports = new UserController;