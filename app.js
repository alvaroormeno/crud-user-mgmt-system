// Step 1-A
const express = require('express');
// Step 2
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql')
require('dotenv').config();
// Step 1-B
const app = express();
// Step 1-C (if we want to publish app we can use environment port number or use default port 5001)
const port = process.env.PORT || 5001;

// Step 3 - Setup Body Parser
// parse application/x-www-form-urlecoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json (make sure body parser is using json)
app.use(bodyParser.json()); 

// Step 4 - Setup Static Files
app.use(express.static('public'));

// Step 5 - Setup templating engine (HANDLEBARS)
// Step 5-A
app.engine('hbs', exphbs.engine({extname: '.hbs'}))
// Step 5-B
app.set('view engine', 'hbs');



// Step 7 - Connect to MYSQL database
// Step 7-A create connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// Step 7-B connect to db
pool.getConnection((err, connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + connection.threadId);
})


// Step 6
// Router
app.get('', (req, res) => {
    res.render('home')
});



// Step 1-D
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})




// NOTES:
// STEP 1 - Setup Express Server
// A - require express,
// B - initialize express
// C - setup port number
// D - listen to port number
//
// STEP 2 - List all of dependencies first and then work our way down
// require express handlebars
// require bodyparser
// require mysql
// require dotenv (note that we require it different from others, read documentation)
//
// STEP 3 - Setup BodyParser 
// will help us pass json data through our forms
//
// STEP 4 - Setup static files
// the files we want to add in our front end, like a custom css file or js file or an easy acess to images
//
// STEP 5 - Setup templating engine / HANDLEBARS
// A - change default file extension from .handlebars to .hbs
// B - setup our view engine, handlebars
//
// STEP 6 - Render home page / home.hbs
//
// STEP 7 - Connect to MYSQL database
// A - create connection pool
// B - connect to db