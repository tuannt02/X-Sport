const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class ProductsController   {
    
    // [GET] /courses/:slug
    show(req, res, next)  {

        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }


        Product.findOne( {slug: req.params.slug} )
            .then(product => {
                // res.json(product);
                res.render('products/show', 
                    { 
                        product: mongooseToObject(product),
                        user: user,
                    });
                
            }).catch(next);


    }

    // [GET] /courses/create
    create(req, res, next)  {
        res.send('Prod create');
    }
}


module.exports = new ProductsController;


