const Product = require('../models/Product');
// const Category = require('../models/Category');
// const Brand = require('../models/Brand');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class Cart{

    //[GET] /cart
    show(req, res, next){
        res.render('user/cart');
    }

}

module.exports = new Cart;