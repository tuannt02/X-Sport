const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Banner = require('../models/Banner');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { cart } = require('./UserController');

class ProductsController {

    //[GET] /admin/create-product
    createProduct(req, res, next) {

        var brand;

        Brand.find({})
            .then(brands => {
                brand = mutipleMongooseToObject(brands);
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
            })
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
        var listBrand;
        var listCategory;

        Brand.find({})
            .then(brands => {
                listBrand = mutipleMongooseToObject(brands);
                Category.find({})
                    .then(categories => {
                        listCategory = mutipleMongooseToObject(categories);
                        Product.findOne({ _id: req.params.id })
                            .then((product => {
                                res.render('partials/admin/products/createProduct',
                                    {
                                        layout: 'admin',
                                        product: mongooseToObject(product),
                                        listCategories: listCategory,
                                        brands: listBrand,
                                        check: true
                                    })
                            }))
                            .catch(next);

                    })
            })
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

    //[DELETE] /admin/delete-category
    destroyCategory(req, res, next) {
        Category.findOne({ _id: req.params.id })
            .then(category => {
                Product.updateMany({ category: category.name }, { $set: { category: 'Khác' } })
                    .then(next)
                    .catch(next);
            })
            .catch(next);

        Category.deleteOne({ _id: req.params.id })
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

    //[GET] /admin/search-brands
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

    //[POST] /admin/create-brand
    createBrand(req, res, next) {
        const brand = new Brand(req.body)
        brand.save()
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[GET] /admin/banners/:slug
    bannersManager(req, res, next) {
        var slug = req.params.slug;
        var bigBanner;

        Banner.find({ type: 'big' })
            .then(banner => {
                bigBanner = mutipleMongooseToObject(banner);

                Banner.find({ type: 'small' })
                    .then(banner => {
                        res.render('partials/admin/banners/banners', { layout: 'admin', smallBanner: mutipleMongooseToObject(banner), bigBanner: bigBanner, val: slug })
                    })
                    .catch(next);
            })
    }

    //[DELETE] /admin/delete-brand
    destroyBrand(req, res, next) {
        Brand.findOne({ _id: req.params.id })
            .then(brand => {
                Product.updateMany({ brand: brand.name }, { $set: { brand: 'Khác' } })
                    .then(next)
                    .catch(next);
            })
            .catch(next);

        Brand.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /admin/create-banner
    createBanner(req, res, next) {
        const banner = new Banner(req.body);
        banner.save({})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /admin/delete-banner
    destroyBanner(req, res, next) {
        Banner.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[GET] /admin/order/prearing
    preparingOrder(req, res, next){
        var slug = 'admin-orders';
        Order.find({DeliverStatus: 0}).sort({datePurChase: 1})
        .then(order =>{
            res.render('partials/admin/orders/orders-preparing', {layout: 'admin', order: mutipleMongooseToObject(order) ,val: slug});
        })
    }

    //[GET] /admin/order/inProgress
    inProgressOrder(req, res, next){
        var slug = 'admin-orders';
        Order.find({DeliverStatus: 1}).sort({datePurChase: 1})
        .then(order =>{
            res.render('partials/admin/orders/orders-inProgress', {layout: 'admin', order: mutipleMongooseToObject(order) ,val: slug});
        })
    }

    //[GET] /admin/order
    completeOrder(req, res, next){
        var slug = 'admin-orders';
        Order.find({DeliverStatus: 2}).sort({datePurChase: 1})
        .then(order =>{
            res.render('partials/admin/orders/orders-complete', {layout: 'admin', order: mutipleMongooseToObject(order) ,val: slug});
        })
    }

    //[GET] /admin/order-detail
    detailOrder(req, res, next){
        var slug = 'admin-detail-order';
        Order.findOne({_id: req.params.id})
        .then(order => {
            var list = order.cartID;
            var order = mongooseToObject(order);
            Cart.find({ _id: { $in: list } }).populate('productID')
            .then( cart => {
                res.render('partials/admin/orders/detail-order', {layout: 'admin', order: order, cart: mutipleMongooseToObject(cart) ,val: slug});
            })
        })
        .catch(next);
    }

    //[PUT] /admin/orders/move-Inprogress
    moveProgress(req, res, next){
        Order.updateOne({_id: req.params.id}, {$set: {DeliverStatus: 1}})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[PUT] /admin/orders/move-Complete
    moveComplete(req, res, next){
        Order.updateOne({_id: req.params.id}, {$set: {DeliverStatus: 2}})
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new ProductsController;


