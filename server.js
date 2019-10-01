const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
let User = require('./models/user');

mongoose.connect('mongodb://localhost/sample', (err) => {
    err ? console.log(err) : console.log('connected');
});

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/users', (req, res) => {
    User.find({}, (err, listUsers) => {
    console.log(err, listUsers);
    if(err){
        return res.json({err});
    }
    res.json({users : listUsers});
    }) 
});

app.post('/users', (req, res) => {
    User.create(req.body, (err, addedUser) => {
        console.log(err, addedUser);
        if(err){
            return res.json({err})
        }
        res.json({users:listUsers});
    });
});

app.get("/users/:id", (req, res) => {
    var userId = req.params.id;

    User.findById(userId, (err, listUsers) => {
        if(err){
            return res.json({err});
        }
        res.json({users: listUsers});
    })
});

app.listen(4006, () => {
    console.log('server started at port 4006');
});