const Banner = require('../models/Banner');
const { mongooseToObject } = require('../../util/mongoose');

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
    
}

module.exports = new ApiController;