var express = require('express');
var bodyParser = require('body-parser');  // For parsing PUT request body
var fs = require('fs');  // For reading files
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

var DEFAULT_FILENAME = 'webcv.json';
var DEFAULT_URL = 'cv';
var DEFAULT_PORT = 3000;

/**
 * Main function, establish a new route url to serve the CV.
 * @param app - ExpressJS handler.
 * @param opt Options
 *            - {string} url - Route to access CV (default 'cv').
 *            - {string} filename - JSON file with CV contents (default 'webcv.json').
 *            - {boolean} listen - Whether or not execure ExpressJS listen (default false).
 *            - {int} port - Port to listen to (default 3000).
 */
var webcv = function(app, opt) {

  opt = opt || {};
  url = opt.url || DEFAULT_URL;
  port = opt.port || DEFAULT_PORT;
  filename = opt.filename || DEFAULT_FILENAME;

  console.log('Executing webcv, serving in [/api]/' + url + '...');

  /* Configuring express to use body-parser as middleware. */
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /*
   * HTTP GET to provide API with CV info
   */
  app.get('/api/'+url, function (req, res, next) {
    console.log('Incoming request to /api/'+url);

    MongoClient.connect('mongodb://localhost:27017/webcv', function(err, db) {
      if (err) {
        throw err;
      }
      /* Retrieve CV from database and serve it in JSON */
      db.collection('cv').findOne({}, function(err, document) {
        if (err) {
          throw err;
        }
        res.json(document);
        db.close();
      });
    });

  });

  /*
   * HTTP GET to load JSON CV from file and store it in DB
   */
  app.get('/api/load', function (req, res, next) {
    console.log('Incoming request to /api/load');

    /* Read file asynchronously */
    var obj;
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) throw err;
      jsonCV = JSON.parse(data);
    });

    MongoClient.connect('mongodb://localhost:27017/webcv', function(err, db) {
      if (err) {
        throw err;
      }
      /* Replacing the only collection we have for the new loaded JSON */
      db.collection('cv').drop();
      db.collection('cv').insertOne(jsonCV, function(err, result) {
        if (err) {
          throw err;
        }
        console.log("CV loaded from JSON file");
        console.log(result.result);
        res.send('GET request received, CV loaded from JSON file');
        db.close();
      });
    });

  });

  /*
   * HTTP GET to provide static files (AngularJS app)
   */
  app.use('/cv', express.static(path.join(__dirname, '/public')));

  /*
   * HTTP PUT to update CV changes in database
   */
   app.put('/api/save', function (req, res) {
    //  console.log(req.body);
    console.log('Incoming request to /api/save');

    MongoClient.connect('mongodb://localhost:27017/webcv', function(err, db) {
      if (err) {
        throw err;
      }
      /* Replacing the only collection we have for the new one */
      db.collection('cv').drop();
      db.collection('cv').insertOne(req.body, function(err, result) {
        if (err) {
          throw err;
        }
        console.log("New CV saved");
        console.log(result.result);
        res.send('PUT request received, CV changes saved');
        db.close();
      });
    });

   });

  /*
   * Optional ExpressJS Listen
   */
  if (opt.listen) {
    app.listen(port, function () {
      console.log('Listening on port '+port+'!');
    });
  }

};

module.exports = webcv;
