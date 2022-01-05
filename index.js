require("dotenv").config() //without dotenv process.env won't work!
var express = require('express');
var app = express();
var path = require("path");

var bodyParser = require('body-parser');
const { json } = require("body-parser");
const { use } = require("express/lib/application");
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var port = process.env.PORT
app.listen(port, function () {
    console.log('Server listening on port ' + port + '!');
    console.log("use http://localhost:"+port)
  });

  var users
var authorizedClients = {
    "ip":{"timeout":null,"login":"test"}
}
var default_timeout = 10000
function resetTimeout(ip){
    if(authorizedClients[ip]["timeout"] != null){clearTimeout(authorizedClients[ip])}
    
    console.log(ip+" has been logged out because of inactivity")
    authorizedClients[ip]["timeout"] = setTimeout(default_timeout,logout)
}

function logout(ip){
    console.log(ip+" logged out")
    authorizedClients[ip] = null
}

app.post("/auth", urlencodedParser, function (req, res) {
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    var postData = req.body

    //console.log("login attempt from "+ip+" "+postData)

    console.log(users)
    console.log(postData)

    if(users[postData["login"]] != null){
        if(postData["password"] == users[postData["login"]]){
            authorizedClients[ip] = {"timeout":null,"login":postData["login"]}
            res.sendFile(path.resolve('./views/home.html'));
        }
        else{
            res.send("invalid password")
        }
    }
    else {
        res.send("invalid login")
    }
  })


app.get('/logout', function(req, res) {
    logout(req.headers['x-real-ip'] || req.connection.remoteAddress)
    res.sendFile(path.resolve('./views/login.html'));
})

app.get("/", function(req, res, next) {
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress

    if(ip in authorizedClients){
        res.sendFile(path.resolve('./views/home.html'));
    }
    else {
        res.sendFile(path.resolve('./views/login.html'));
    }
})



function fullUrl(req) {
    return url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    });
  }

function reloadUsers(){
    users = require("./users.json")
    console.log(users)
}
reloadUsers()