// Requires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/type');

// Connect to MongoDB database Using mongoose
mongoose.connect('mongodb://localhost/article',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        console.log('Connected', !err);
    });

mongoose.set('useCreateIndex', true);

// Initialing express app
var app = express();

// setup template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Form parser middleware
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
    res.render('newarticle');
});

// listing Users
app.get('/article', (req, res) => {
    User.find((err, usersList) => {
        res.render('users', {usersList: usersList});
    });
});

// creating a User
app.post('/newarticle', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        console.log(err, createdUser);
        if(err) return res.json({err});
        res.redirect('/display_article')
    });
});

// Update form
app.get('/article/:id/edit', (req, res) => {
    var userId = req.params.id;
    User.findById(userId, (err, user) => {
        if(err) return res.json({ err });
        res.render('editUser', {user: user})

    });
});

// Updating article
app.post('/article/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedArticle) => {
        if(err) return res.json({ err });
        res.redirect('/article/' + updatedArticle.id);
    });
});

// Delete a article
app.get('/article/:id/delete', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err) return res.json({ err });
        res.redirect('/article')
    });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Page Not found');
});

//Listener
app.listen(4004, () => {
    console.log('Server started on port 4004')
});