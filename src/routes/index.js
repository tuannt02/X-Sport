const newsRouter = require('./news');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const buyerRouter = require('./buyer');
const sellerRouter = require('./seller');
const APIsRouter = require('./api');

function route(app) {
    app.use('/news', newsRouter);
    
    app.use('/admin', adminRouter);
    
    app.use('/buyer', buyerRouter);

    app.use('/seller', sellerRouter);

    app.use('/api', APIsRouter);

    app.use('/', siteRouter);
    
    
   
    
    
}

module.exports = route;

