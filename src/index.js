const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

const sortMiddleware = require('./app/middlewares/sortMiddleware');
const handlebarCustom = require('./helpers/handlebas');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended : true
}));

app.use(methodOverride('_method'));

// middleware custom
app.use(sortMiddleware);

app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: handlebarCustom,
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));