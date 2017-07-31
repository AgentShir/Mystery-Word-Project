const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){
  res.render("index")
})

var users = [];

app.post('/', function(req, res){
  console.log('Guesses: ', req.body.guess);
  res.render("guess", {guess:req.body.guess});
});

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){

  res.render("index");

});

// var users = [];
//
// app.post('/', function(req, res){
//   console.log('BODY: ', req.body);
//   res.render("user", {email:req.body.email, name:req.body.name, year:req.body.year, position:req.body.position, password:req.body.password});
// });


app.listen(3000, function(){
  console.log("App running on port 3000")
})
