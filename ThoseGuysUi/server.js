
const path = require('path');
const express = require('express');
const config = require("./config/index");
const hoffman = require("hoffman");
const cookie = require("js-cookie");

var cookieParser = require('cookie-parser');

const app = express();
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'dust');
app.engine('dust', hoffman.__express());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, 'dist')));
app.use("/icons", express.static(__dirname + ' /icons'));
app.set('port', process.env.port || config.port);
app.set('host', config.host);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode >= 100 && err.statusCode < 600 ? err.statusCode : 500);
    res.json({
      message: err.message
    });
  } else {
    res.end();
  }
});

login = (req, res, next) => {
  if(req.cookies.auth!=undefined){
    if(req.cookies.auth.userType=="user")
      res.redirect("/home/user/apply")
      else
      res.redirect("/home/admin/pending")
  }else {
      next()
  }
}
accessProtect = (req, res, next) => {
  // console.log(req.cookies.auth)
  if (req.cookies.auth!=undefined) {
    if(JSON.parse(req.cookies.auth).userType=="user"){
    next();
    }
    else {
      res.status(403);
      res.redirect("/home/admin/pending");
    }
  } else {
    res.status(403);
    res.redirect("/login");
  }
}
adminProtect = (req, res, next) => {
  
  if (req.cookies.auth!=undefined) {
    
    if(JSON.parse(req.cookies.auth).userType=="admin"){
      next();
      }
      else {
        res.status(403);
        res.redirect("/home/user/apply");
      }
  } else {
    res.status(403);
    res.redirect("/login");
  }
}
app.get('/login',login, function response(req, res) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.render("index");
});
app.get('/signup',login, function response(req, res) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.render("index");
});


app.get('/home/user/*',accessProtect, function response(req, res) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.render("index");
});

app.get('/home/admin/*',adminProtect, function response(req, res) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.render("index");
});




app.listen(app.get('port'), '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log("ENV set as : " + process.env.NODE_ENV)
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', app.get('port'), app.get('port'));
});
