//requiring teh paths to routes, mongo db connection and express
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//what is this?
const cwd = process.cwd();

//server port running on 3001 has a .env and storing instance of express in app variable
const PORT = process.env.PORT || 3001;
const app = express();

//what is this?
const activity = cwd.includes('01-Activities')
    ? cwd.split('01-Activities')[1]
    : cwd;

//use middleware to parse URL encoded data with the qs library enabling req.body in route handlers
app.use(express.urlencoded({ extended: true }));
//use middleware to parse JSON formatted data enabling req.body in route handlers
app.use(express.json());
//use routes defined in const routes as middleware for matching and handling comes after global middleware (above)
app.use(routes);

//one time event listener for connection to db, 'once open' express accepts requests to db
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on port ${PORT}!`);
    });
});