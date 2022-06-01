const siteRouter = require('./site');
const userRouter = require('./user');
const productsRouter = require('./products');
const APIsRouter = require('./api');
const UserController = require('../app/controllers/UserController');
const AdminRouter = require('./admin');
const { requireAuth, checkUser } = require('../app/middleware/UserMiddleware');

function route(app) {
    app.get('*', checkUser);

    app.use('/user', userRouter);

    app.use('/admin', AdminRouter);

    app.use('/products', productsRouter);

    app.use('/api', APIsRouter);

    app.use('/',
        // requireAuth, 
        siteRouter);
   
    
    
}

module.exports = route;

