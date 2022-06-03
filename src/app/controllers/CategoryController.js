const Category = require('../models/Category');
const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class CategoryController   {
    
    // [GET] /categories/:slug
    show(req, res, next)  {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }

        Product.find({})
        .then(products => {

            Category.findOne( {slug: req.params.slug} )
            .then(category => {

                res.render(
                    'category',
                    {
                        category: mongooseToObject(category),
                        layout: 'site2',
                        title: 'Danh mục',
                        val: 'category',
                        user: user,
                        trendingProd: mutipleMongooseToObject(products),
                    });
                
            }).catch(next);

        })



    }

}


module.exports = new CategoryController;