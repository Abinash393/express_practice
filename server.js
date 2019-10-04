const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

let User = require('./models/userDB');

mongoose.connect('mongodb://localhost/sample', (err) => {
    err ? console.log(err) : console.log('connected');
});

let app = express();

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

app.get('/users', (req, res) => {
    User.find({}, (err, listUsers) => {
        console.log(err, listUsers);
        res.render('all_user', {listUsers : listUsers});
    });
});

app.post('/users', (req, res) => {
    User.create(req.body, (err, addedUser) => {
        console.log(err, addedUser);
        if(err){
            return res.json({err});
        }

    });
});

//get request with user id
app.get("/users/:id", (req, res) => {
    var userId = req.params.id;
    User.findById(userId, (err, listUsers) => {
        if(err){
            return res.json({err});
        }
        res.json({users: listUsers});
    })
});

//put request
app.put("/users/:id", (req,res) => {
    var userId = req.params.id;
    User.findByIdAndUpdate(userId, req.body, {new : true}, (err, updateData) => {
       if(err){
           return res.json({err});
       }
       res.json({users : updateData});
    });
});

//delete request
app.delete('/users/:id', (req, res) => {
   var userId = req.params.id;
   User.findByIdAndDelete(userId, req.body, (err, updatedData) => {
       if(err){
           return res.json({err});
       }
       res.json({User : updatedData});
   });
});