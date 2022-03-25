const Category = require('../models/Category');
const Banner = require('../models/Banner');

const { mutipleMongooseToObject } = require('../../util/mongoose')


class SiteController    {
    
    // [GET] / 
    index(req, res, next) {        
        

        // Course.find({}, function(err, courses)   {
        //     if(!err)    {
        //         res.json(courses);
        //         return;
        //     }
        //     res.status(400).json({error: 'Vui long lien he quan tri vien'});
        // })

        var bannerss;
        Banner.find({})
        .then(banners => {
            bannerss = mutipleMongooseToObject(banners);
        })
        .catch(next);
        
        Category.find({})
            .then(categories => {
                res.render('home', { 
                    categories: mutipleMongooseToObject(categories),
                    banners: bannerss,
                 })
            })
            .catch(next);

        
    }

    // [GET] /search
    search(req,res)  {
        res.render('search');
    }
}

module.exports = new SiteController;