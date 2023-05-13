const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

// Handlebars engine setup
app.engine('hbs', handlebars.engine({
    layoutsDir: 'layout',
    defaultLayout: '_main.hbs',
    extname: '.hbs',
}))
app.set('view engine', 'hbs');

// Provide Bootstrap
app.use(express.static('node_modules/bootstrap/dist/'));
app.use(express.static('node_modules/bootstrap-icons/font/'));

// Handle requests
app.get('/', (req, res) => {
    return res.render('index');
})

app.get('/link', (req, res) => {
    return res.render('link');
})


 app.listen(8080);