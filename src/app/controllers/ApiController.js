const Banner = require('../models/Banner');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

const { mongooseToObject } = require('../../util/mongoose');
const PageSize = 2;
const jwt = require('jsonwebtoken');


class ApiController    {
    getBanner(req,res)  {
        
        Banner.find({})
            .then(data => {
                res.json(data);
            }) 
            .catch(err => {
                res.status(500).json('loi server')
            });
    }


    
    
    getCategory(req,res)    {
        
        Category.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json('loiserver');
        })
        
    }


    show(req,res){
        var pageNumber = req.query.pageNumber
        if(pageNumber){
            //get pageNumber
            pageNumber = parseInt(pageNumber);
            //page start 
            if(pageNumber < 1)
            pageNumber = 1;
            var PageSkip = (pageNumber - 1)*PageSize;

            Product.find({})
            .skip(PageSkip)
            .limit(PageSize)            
            .then(data=>{
                res.json(data);                
            })
            .catch(err=>{
                res.status(500).json('loi server');
            })
        }
        else{
            //page start
            Product.find({})
            .limit(PageSize)
            .then(data=>{
                res.json(data);
            })
            .catch(err=>{
                res.status(500).json('loi server');
            })
        }
    }




    // [POST]
    sign_in(req, res, next)   {
        const username = req.body.username;
        const password = req.body.password;



        Customer.findOne({
            username: username,
            password: password
        })
        .then(data => {
            if(!data)   {
                return res.json({
                    status: "fail",
                    mes: "Tài khoản hoặc mật khẩu sai",
                })
            }
            else    {
                const token =  jwt.sign({username: data.username}, 'tuannt', { expiresIn: '1h' })

                return res.json({
                    status: "success",
                    data: "token="+ token, 
                })


            }
        })
        .catch(err => {
            res.status(500).json('Lỗi server');
        }); 

    }

    log_out(res,req)    {
        
        res.cookie('token', '', {maxAge: 1});
        res.redirect('/user/sign_in');
    }

    
}

module.exports = new ApiController;