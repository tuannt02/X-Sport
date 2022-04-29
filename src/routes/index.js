const siteRouter = require('./site');
const buyerRouter = require('./buyer');
const productsRouter = require('./products');
const APIsRouter = require('./api');

function route(app) {
    app.use('/buyer', buyerRouter);

    app.use('/products', productsRouter);

    app.use('/api', APIsRouter);

    app.use('/', siteRouter);
    
    
   
    
    
}

module.exports = route;

