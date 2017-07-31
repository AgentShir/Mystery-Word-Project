const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
var session = require('express-session')
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


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

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})


app.listen(3000, function(){
  console.log("App running on port 3000")
})
