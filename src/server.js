const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser')
const app = express();
const port = 3001;
var cors = require('cors')
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
// app.use(cors(corsOptions))

const route = require('./routes');
const db = require('./config/db');


// Connect to DB
db.connect();

// Configure static file on path
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(express.urlencoded({
  limit:'50mb',
  parameterLimit: 100000,
  extended: true
}));
app.use(express.json({limit: '50mb'}));
app.use(methodOverride('_method'));

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
            if(k%3==0 && i!=0)  {
                temp = [temp.slice(0,i), dot, temp.slice(i)].join('');
            }
        }
        return temp;
      },
      print_price_down: function(price,discount) {
        var temp;
        temp = (price*(100-discount)*0.01).toString();
        var dot = ".";
        var k=0;
        for(var i = temp.length - 1; i >= 0; i--)   {
            ++k;
            if(k%3==0 && i!=0)  {
                temp = [temp.slice(0,i), dot, temp.slice(i)].join('');
            }
        }
        return temp;
      },
      price_down: function(price,discount) {
        return(price*(100-discount)*0.01);
      },
      print_date: function(date){
        var temp = new Date();
        temp = date; 
        return date.toLocaleDateString();
      },
      remaining_product: function(total, sold)  {
        return total - sold;
      },
      sum_price_product: function(price, quatity){
        return price * quatity;
      },
      sum: function(num1, num2){
        return num1 + num2;
      },
      string_equal: function(str1, str2){
        return str1.toString() == str2.toString();
      },
      getDate: function(date, days){
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
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

