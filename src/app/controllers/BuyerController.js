const Customer = require('../models/Customer');
const { mongooseToObject } = require('../../util/mongoose');

const jwt = require('jsonwebtoken');


class BuyerController    {
    
    // [GET] /login
    login(req,res) {
        res.render('login', {layout: 'login'});
    }

    // [POST] /login -> authenticate
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
                return res.redirect('http://localhost:3001/buyer/login');
            }
        }
        catch{
            next();
        }


    }


    // [GET] /register
    register(req,res)   {
        res.render('register');
    }

    // [GET] /
    // -> isLogin == true ? ->homePage : -> loginPage
    rerouting(req,res)  {
        res.redirect('http://localhost:3001/buyer/login');
    }
}

module.exports = new BuyerController;