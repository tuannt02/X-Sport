const Customer = require('../models/Customer');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

const jwt = require('jsonwebtoken');


const handleErrors = (err) => {
    // console.log(err.message, err.code);

    let errors = { email: '', password: ''};

    // incorrect email
    if (err.message === 'incorrect email')  {
        errors.email = 'Email này chưa được đăng ký';
    }

    // incorrect password
    if (err.message === 'incorrect password')  {
        errors.password = 'Mật khẩu vừa nhập không đúng';
    }


    // duplicate error code
    if(err.code === 11000)  {
        errors.email = 'Email đã tồn tại';
        return errors;
    }


    // validation error
    if(err.message.includes('user validation failed'))  {
        Object.values(err.errors).forEach(({properties}) => {
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

class UserController    {



    // [GET] /sign_in
    sign_in(req,res) {
        res.render('user/sign_in', {layout: 'sign_in'});
    }

    // [POST] /sign_in
    async sign_in_post(req, res)  {
        const { email, password} = req.body;

        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.redirect('/');
        }
        catch(err)  {
            const errors = handleErrors(err);

            res.render('user/sign_in', 
                {
                    layout: 'sign_in',
                    err: errors, 
                })
        }
    }

    // [POST] /sign_in -> authenticate
    authenticate(req,res, next)   {

        const username = req.body.username;
        const password = req.body.password;

        Customer.findOne({
            username: username,
            password: password
        })
        .then(data => {
            if(!data)   {
                return res.status(400).send("Wrong password");
            }
            else    {
                const token =  jwt.sign({username: data.username}, 'tuannt', { expiresIn: '1h' })
                res.cookie('token', token);

                next();
            }
        })
        .catch(err => {
            res.status(500).json('Lỗi server');
        }); 
        

    }

    // Middleware isAuthen
    isAuthen(req, res, next)    {
        try {
            const token = req.cookies.token;
            const parserToken = jwt.verify(token, 'tuannt');

            console.log(token);

            if(parserToken) {
                console.log(parserToken);
                return res.redirect('http://localhost:3001/');
            }
            else    {
                res.clearCookie('token');
                return res.redirect('http://localhost:3001/user/login');
            }
        }
        catch{
            next();
        }


    }


    // [GET] /sign_up
    sign_up(req,res)   {
        res.render('user/sign_up', {layout: 'sign_up'});
    }

    // [POST /sign_up
    async sign_up_post(req, res)   {
        const { email, password} = req.body;

        try{
            const user = await User.create({
                email,
                password,
            });
            res.render('user/sign_up', 
                {
                    layout: 'sign_up',
                    data:   {
                        status: true,
                        err: false,
                        mes: 'Tạo tài khoản thành công, vui lòng đăng nhập',
                    }  
                });
        }
        catch(err)  {
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
    forget_password(req, res)   {
        res.render('user/forget_password', {layout: 'forget_password'});
    }


    // [GET] /account/:slug
    account(req, res, next)   {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }

        var slug = req.params.slug;
        if(slug == 'profile')   {
            res.render('partials/user/account/profile', 
            {
                layout: 'user_info',
                val: slug,
                user: user,
            })
            return;
        }

        if(slug == 'address')   {
            res.render('partials/user/account/address', 
            {
                layout: 'user_info',
                val: slug,
                user: user,
            });
            return;
        }

        if(slug == 'password')  {
            res.render('partials/user/account/password', 
            {
                layout: 'user_info',
                val: slug,
                user: user,
            });
            return;
        }


        next();
    }


    // [GET] /purchase  
    purchase(req, res, next)  {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }

        res.render('partials/user/purchase/purchase', 
        {
            layout: 'user_info',
            val: 'purchase',
            user: user,
        });
    }

    // [GET] /notifications
    notifications(req, res, next) {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }

        res.render('partials/user/notifications/notifications', 
        {
            layout: 'user_info',
            val: 'notifications',
            user: user,
        });
    }


    // [GET] /
    // -> isLogin == true ? ->homePage : -> loginPage
    rerouting(req,res)  {
        res.redirect('http://localhost:3001/user/login');
    }
}

module.exports = new UserController;