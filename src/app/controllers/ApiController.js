const Banner = require('../models/Banner');
const Category = require('../models/Category');
const { mongooseToObject } = require('../../util/mongoose');

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

    
}

module.exports = new ApiController;