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
  // View engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  opt = opt || {};
  url = opt.url || DEFAULT_URL;
  port = opt.port || DEFAULT_PORT;
  filename = opt.filename || DEFAULT_FILENAME;

  console.log('Executing webcv, serving in /' + url + '...');
  /* HTTP GET */
  app.get('/'+url, function (req, res, next) {
    console.log('Request to /'+url);

    /* Read file asynchronously */
    var obj;
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.render('index', { cv: obj });
    });

  });

  /* Optional ExpressJS Listen */
  if (opt.listen) {
    app.listen(port, function () {
      console.log('Listening on port '+port+'!');
    });
  }

};

module.exports = webcv;
