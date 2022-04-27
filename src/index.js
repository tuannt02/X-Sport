const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser')
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

app.use(cookieParser());


// HTTP logger
app.use(morgan('combined'));

// Template engine
// Convert .handlebars ext to .hbs ext 
app.engine(
  '.hbs', 
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      print_price: function(price) {
        var temp;
    temp = price.toString();
    var dot = ".";
    var k=0;
    for(var i = temp.length - 1; i >= 0; i--)   {
        ++k;
        if(k%3==0)  {
            temp = [temp.slice(0,i), dot, temp.slice(i)].join('');
        }
    }
    return temp;
      }
  }
}));
app.set('view engine', '.hbs');

// Configure path views because views dir # views dir default
app.set('views', path.join(__dirname, 'resources', 'views'));



// Route init
route(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

