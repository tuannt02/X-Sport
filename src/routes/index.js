const siteRouter = require('./site');
const userRouter = require('./user');
const productsRouter = require('./products');
const APIsRouter = require('./api');
const AdminRouter = require('./admin');

function route(app) {

    app.use('/admin', AdminRouter);

    app.use('/user', userRouter);

    app.use('/products', productsRouter);

    app.use('/api', APIsRouter);

    app.use('/', siteRouter);

    
    
   
    
    
}

module.exports = route;

