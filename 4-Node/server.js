var fs = require("fs");
var url = require("url");
var http = require("http");
var ROOT_DIR = "/home/cole/Code/cs201r";

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  console.log(urlObj);
  if(urlObj.pathname.indexOf("getCity") != -1) {
    console.log("in REST Service");
    var regEx = new RegExp("^" + urlObj.query["q"]);
    fs.readFile('cities.dat.txt', function (err, data) {
      if (err) throw err;
      cities = data.toString().split("\n");
      var results = [];
      for(var i = 0; i < cities.length; i++) {
        var result = cities[i].search(regEx);
        if(result != -1) {
          console.log(cities[i]);
          results.push({city:cities[i]});
        }
      }
      res.writeHead(200);
      res.end(JSON.stringify(results));
    });
  }
  else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      console.log("You got served!! This file: " + urlObj.pathname);
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(8080);

console.log("Starting server");
