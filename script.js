const express = require('express');
var path = require('path');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use((req, res, next) => {
//     req.body = {};
//     next()
// });

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('access');
});

app.listen(3003, () => {
    console.log('Express server started at port 3003');
});