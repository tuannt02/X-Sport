const Category = require('../models/Category');
const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { TRUE } = require('node-sass');


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


                const nameCategory = mongooseToObject(category).name;
                var listProducts = [];
                products.forEach(ele => {
                    if(ele.category === nameCategory) {
                        listProducts.push(ele);
                    }
                });

                res.render(
                    'category',
                    {
                        category: mongooseToObject(category),
                        layout: 'site2',
                        title: 'Danh mục',
                        val: 'category',
                        user: user,
                        trendingProd: mutipleMongooseToObject(listProducts),
                    });
                
            }).catch(next);

        })



    }

    // [POST] /categories/search-product
    search(req, res, next)  {
        var filterBrands = req.body.brand_item;
        var filterPrice = req.body.radio_price;
        var levelPrice;
        if(filterPrice == 'Nhỏ hơn 1,000,000đ') {
            levelPrice = 0;
        }
        if(filterPrice == 'Từ 1,000,000đ - 1,500,000đ') {
            levelPrice = 1;
        }
        if(filterPrice == 'Từ 1,500,000đ - 2,000,000đ') {
            levelPrice = 2;
        }
        if(filterPrice == 'Từ 2,000,000đ - 3,000,000đ') {
            levelPrice = 3;
        }
        if(filterPrice == 'Lớn hơn 3,000,000đ') {
            levelPrice = 4;
        }
        var filterSizes = req.body.size_item;
        if(typeof filterSizes == 'string')  {
            filterSizes = [filterSizes];
        }


        function isMatchArr(arr1, arr2)    {
            var a = arr1.length + arr2.length;
            var arr = arr1.concat(arr2);

            arr = Array.from(new Set(arr));
            if(a === arr.length) return false;
            return true;
        }

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

                const nameCategory = mongooseToObject(category).name;
                var listProducts = [];
                products.forEach(ele => {
                    if(ele.category === nameCategory) {
                        listProducts.push(ele);
                    }
                });

                // Loop req1
                var listProducts1 = [];
                listProducts.forEach((ele,index) => {
                    if(filterBrands.includes(ele.brand))  {
                        listProducts1.push(ele);
                    }
                })

                // Loop req2
                var listProducts2 = [];
                listProducts1.forEach(ele => {
                    if(isMatchArr(filterSizes, ele.size) == true)  {
                        listProducts2.push(ele);
                    }
                })

                //Loop req3
                var listProducts3 = [];
                listProducts2.forEach(ele => {
                    if(levelPrice == 0) {
                        if(ele.price < 1000000) listProducts3.push(ele);
                    }
                    if(levelPrice == 1) {
                        if(ele.price < 1500000 && ele.price >= 1000000) listProducts3.push(ele);
                    }
                    if(levelPrice == 2) {
                        if(ele.price < 2000000 && ele.price >= 1500000) listProducts3.push(ele);
                    }
                    if(levelPrice == 3) {
                        if(ele.price < 3000000 && ele.price >= 2000000) listProducts3.push(ele);
                    }
                    if(levelPrice == 4) {
                        if(ele.price >= 3000000) listProducts3.push(ele);
                    }
                })

                res.render(
                    'category',
                    {
                        category: mongooseToObject(category),
                        layout: 'site2',
                        title: 'Danh mục',
                        val: 'category',
                        user: user,
                        trendingProd: mutipleMongooseToObject(listProducts3),
                    });
                
            }).catch(next);

        })


    } 

}


module.exports = new CategoryController;