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
            .catch(next);
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
                .catch(next)
        } else {
            Product.find({})
                .then(products => {
                    res.render('partials/admin/products/listProductView',
                        { layout: 'admin', products: mutipleMongooseToObject(products) })
                })
                .catch(next);
        }
    }


    //[DELETE] /admin/:id
    destroyProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[GET] /admin/edit-view-product/:id
    editView(req, res, next) {
        Product.findOne({
            _id: req.params.id
        })
            .then((product => {
                res.render('partials/admin/products/createProduct',
                    { layout: 'admin', product: mongooseToObject(product), check: true })
            }))
            .catch(next);
    }

    //[PUT] /admin/edit-product/:id
    updateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next);
    }


    //[GET] /admin/categories/:slug
    categoriesManager(req, res, next) {
        var slug = req.params.slug;
        Category.find({})
            .then(category => {
                res.render('partials/admin/categories/categories', { layout: 'admin', category: mutipleMongooseToObject(category), val: slug })
            })
            .catch(next);
    }

    //[GET] /admin/search-categories
    categoriesSearch(req, res, next) {
        var slug = req.params.slug;
        if (req.query.value) {
            Category.find({ name: { '$regex': req.query.value, '$options': 'i' } })
                .then(category => {
                    res.render('partials/admin/categories/categories', { layout: 'admin', category: mutipleMongooseToObject(category), val: slug })
                })
                .catch(next)
        }
        else {
            Category.find({})
                .then(category => {
                    res.render('partials/admin/categories/categories', { layout: 'admin', category: mutipleMongooseToObject(category), val: slug })
                })
                .catch(next);
        }
    }

    //[POST] /admin/create-category
    createCategory(req, res, next) {
        const category = new Category(req.body)
        category.save()
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //Brand manager
    //[GET] /admin/brands/:slug
    brandsManager(req, res, next) {
        var slug = req.params.slug;
        Brand.find({})
            .then(brand => {
                res.render('partials/admin/brands/brands', { layout: 'admin', brand: mutipleMongooseToObject(brand), val: slug })
            })
            .catch(next);
    }

    //[GET] /admin/search-categories
    brandsSearch(req, res, next) {
        var slug = req.params.slug;
        if (req.query.value) {
            Brand.find({ name: { '$regex': req.query.value, '$options': 'i' } })
                .then(brand => {
                    res.render('partials/admin/brands/brands', { layout: 'admin', brand: mutipleMongooseToObject(brand), val: slug })
                })
                .catch(next)
        }
        else {
            Brand.find({})
                .then(brand => {
                    res.render('partials/admin/brands/brands', { layout: 'admin', brand: mutipleMongooseToObject(brand), val: slug })
                })
                .catch(next);
        }
    }

    //[POST] /admin/create-category
    createBrand(req, res, next) {
        const brand = new Brand(req.body)
        brand.save()
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ProductsController;


