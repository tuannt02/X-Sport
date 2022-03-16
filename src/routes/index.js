const newsRouter = require('./news');
const siteRouter = require('./site');
const buyerRouter = require('./buyer');
const APIsRouter = require('./api');

function route(app) {
    app.use('/news', newsRouter);
    
    app.use('/buyer', buyerRouter);


    app.use('/api', APIsRouter);

    app.use('/', siteRouter);
    
    
   
    
    
}

module.exports = route;

