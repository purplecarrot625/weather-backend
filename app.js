"use strict"

var express = require('express')
//const bodyParser = require('body-parser');

var app = express()
//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000)
console.log('Node.js Express server id running on port 3000...')

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ["https://editor.swagger.io", "https://hoppscotch.io"];
    const origin = req.headers.origin;
        
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
// Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  
// Request headers you wish to allow
res.setHeader("Access-Control-Allow-Headers", ["Authorization", "X-Requested-With,content-type"]);

const bearerHeader = req.headers["authorization"];
if (typeof bearerHeader != "undefined") {
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
}

// Pass to next layer of middleware
next();
});


app.get('/data/2.5/weather', get_weather)
app.get('/v1/weather', get_weather)
app.get('/v1/hello', get_hello)
app.post('/v1/auth',get_auth)

function get_weather(request, response) {
    if (request.token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthcmwgQWRyaWFubyIsImlhdCI6MTUxNjIzOTAyMn0.STyNSCjMt9cKNL6YVfLRTBabPbzbW1FDRebDqTwC2-c") {
    response.json({
        "coord":{
            "lon":-123.262,
            "lat":44.5646},
        "weather":[
            {"id":803,
            "main":"Clouds",
            "description":
            "broken clouds","icon":"04d"}
        ],
        "base":"stations",
        "main":{
            "temp":281.56,"feels_like":281.56,
            "temp_min":279.46,
            "temp_max":283.9,
            "pressure":1032,"humidity":73
        },
        "visibility":10000,
        "wind":{
            "speed":0.89,"deg":113,"gust":1.34},
            "clouds":{"all":75},
            "dt":1642803894,
            "sys":{
                "type":2,
                "id":2040223,
                "country":"US",
                "sunrise":1642779731,
                "sunset":1642813576
            },
            "timezone":-28800,
            "id":5720727,
            "name":"Corvallis","cod":200
        })
    }
    else {
        response.sendStatus(401);
    }
}

function get_hello(request, response) {
    if (request.token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthcmwgQWRyaWFubyIsImlhdCI6MTUxNjIzOTAyMn0.STyNSCjMt9cKNL6YVfLRTBabPbzbW1FDRebDqTwC2-c") {
    response.json({"greetings": "Greetings to you all!"})
    }
    else {
        response.sendStatus(401);
    }
}

function get_auth(request, response) {
    
    response.json({
        "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthcmwgQWRyaWFubyIsImlhdCI6MTUxNjIzOTAyMn0.STyNSCjMt9cKNL6YVfLRTBabPbzbW1FDRebDqTwC2-c",
        "expires": "2022-02-11T23:59:59.999-08:00"
      })
}
