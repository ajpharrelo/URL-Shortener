const express = require('express');
const handlebars = require('express-handlebars');
const linkController = require('./controller/link');
const app = express();

const hostname = "https://ajae.uk";

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

// Handle form posting
app.use(express.urlencoded({extended: true}));
app.post('/', (req, res) => {
    
    if(req.body.url)
    {
        linkController.addLink(req.body.url, (result) => {
            if(result.existing == true)
            {
                return res.redirect('/link?id=' + result.existingId);
            }
            else
            {
                return res.redirect('/link?id=' + result.newId);
            }
        });
    }
    else
    {
        return res.redirect('/');
    }
})

app.get('/link', (req, res) => {
    // Display newly created or existing links short URL
    if(req.query.id && linkController.checkIDExists(req.query.id) == true)
    {
        return res.render('link', {id: req.query.id, host: hostname});
    }
    else
    {
        return res.redirect('/');
    }
})

// Handle short URLS | su = "Short URL"
app.get('/su', (req, res) => {
    if(req.query.id && linkController.checkIDExists(req.query.id) == true){
        let link = linkController.getLink(req.query.id);
        linkController.linkUsed(link.id)
        return res.redirect(link.url);
    }
})

 app.listen(8080);