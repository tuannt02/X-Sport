const Banner = require('../models/Banner');
const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mongoose');
const PageSize = 2;


class ApiController    {
    index(req,res)  {
        
        Banner.find({})
            .then(data => {
                res.json({ data });
            }) 

            .catch(err => {
                res.status(500).json('loi server')
            });
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
    
}

module.exports = new ApiController;