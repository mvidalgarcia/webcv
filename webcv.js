var express = require('express');
var bodyParser = require('body-parser');  // For parsing PUT request body
var fs = require('fs');  // For reading files
var path = require('path');

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

    /* Read file asynchronously */
    var obj;
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.json(obj);
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
     console.log(req.body);
     console.log('Incoming request to /api/save');
     res.send('PUT request received, CV changes saved');
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
