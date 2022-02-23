const express = require('express')
const app = express()
const mongoose = require('mongoose');
//const uri = process.env.MONGODB_URI;
mongoose.connect( "mongodb://chengyi:970908amy@iad2-c12-2.mongo.objectrocket.com:54629,iad2-c12-1.mongo.objectrocket.com:54629,iad2-c12-0.mongo.objectrocket.com:54629/db?replicaSet=385a2eb790384df0b568a36554b7cc1d",
    {useNewUrlParser: true, useUnifiedTopology: true});

// configure CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//const demos = require('./controllers/demo-controller');
//demos(app);

// const quizzesController = require("./controllers/quizzes-controller")
// quizzesController(app)

require("./controllers/quizzes-controller")(app)
require("./controllers/questions-controller")(app)
require('./controllers/quiz-attempts-controller')(app)


app.listen(process.env.PORT || 3000)