const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class ProductsController {

    //[GET] /admin/create-product
    createProduct(req, res, next) {

        var brand;

        Brand.find({})
            .then(brands => {
                brand = mutipleMongooseToObject(brands);
            })
        

        Category.find({})
        .then(categories => {
            res.render('partials/admin/products/createProduct', 
            { 
                layout: 'admin',
                listCategories: mutipleMongooseToObject(categories),
                brands: brand,
            });
        })
        .catch(next);

    }


    //[POST] /admin/store-product
    storeProduct(req, res, next) {
        const product = new Product(req.body);
        product.save()
            .then(() => res.json(req.body))
            .catch(next);
    }


    //[GET] /admin/view-product
    productView(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('partials/admin/products/listProductView',
                    { layout: 'admin', products: mutipleMongooseToObject(products) })
            })
    }


    //[GET] /admin/search-product/:value
    productSearch(req, res, next) {
        if (req.query.value) {
            Product.find({
                $or: [{ name: { '$regex': req.query.value, '$options': 'i' } },
                { brand: { '$regex': req.query.value, '$options': 'i' } },
                { category: { '$regex': req.query.value, '$options': 'i' } },
                // { price: { '$regex': req.query.value.text, '$options': 'i' } },
                // { total: { '$regex': req.query.value, '$options': 'i' } },
                // { sold: { '$regex': req.query.value, '$options': 'i' } }
                ]
            })
                .then(products => {
                    res.render('partials/admin/products/listProductView',
                        { layout: 'admin', products: mutipleMongooseToObject(products) })
                })
        } else {
            Product.find({})
                .then(products => {
                    res.render('partials/admin/products/listProductView',
                        { layout: 'admin', products: mutipleMongooseToObject(products) })
                })
        }
    }


    //[DELETE] /admin/:id
    destroyProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}


module.exports = new ProductsController;

