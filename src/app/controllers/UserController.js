const Customer = require('../models/Customer');
const { mongooseToObject } = require('../../util/mongoose');

const jwt = require('jsonwebtoken');


class UserController    {
    
    // [GET] /sign_in
    sign_in(req,res) {
        res.render('user/sign_in', {layout: 'sign_in'});
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
                return res.json('that bai');
            }
            else    {
                const token =  jwt.sign({username: data.username}, 'tuannt', { expiresIn: '1h' })
                res.cookie('token', token);

                next();
            }
        })
        .catch(err => {
            res.status(500).json('loi server');
        }); 
        

    }

    // Middleware isAuthen
    isAuthen(req, res, next)    {
        try {
            const token = req.cookies.token;
            const parserToken = jwt.verify(token, 'tuannt');

            if(parserToken) {
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


    // [GET] /forget_password
    forget_password(req, res)   {
        res.render('user/forget_password', {layout: 'forget_password'});
    }


    // [GET] /account/:slug
    account(req, res, next)   {

        var slug = req.params.slug;
        if(slug == 'profile')   {
            res.render('partials/user/account/profile', {layout: 'user_info'})
            return;
        }

        if(slug == 'address')   {
            res.send(slug + ' page');
            return;
        }

        if(slug == 'password')  {
            res.send(slug + ' page');
            return;
        }


        next();
    }


    // [GET] /
    // -> isLogin == true ? ->homePage : -> loginPage
    rerouting(req,res)  {
        res.redirect('http://localhost:3001/user/login');
    }
}

module.exports = new UserController;