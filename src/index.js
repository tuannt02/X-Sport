const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const app = express();
const port = 3001;

const route = require('./routes');
const db = require('./config/db');


// Connect to DB
db.connect();

// Configure static file on path
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


// HTTP logger
app.use(morgan('combined'));

// Template engine
// Convert .handlebars ext to .hbs ext 
app.engine('.hbs', exphbs.engine({
  extname: ".hbs",
}));
app.set('view engine', '.hbs');

// Configure path views because views dir # views dir default
app.set('views', path.join(__dirname, 'resources', 'views'));



// Route init
route(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

