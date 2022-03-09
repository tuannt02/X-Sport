const newsRouter = require('./news');
const siteRouter = require('./site');
const buyerRouter = require('./buyer');

function route(app) {
    app.use('/news', newsRouter);
    
    app.use('/buyer', buyerRouter);


    app.use('/', siteRouter);
    
    
   
    
    
}

module.exports = route;

