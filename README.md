# webcv
A basic npm module to add a CV to your node.js web site and edit it online.
Built using [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) stack.

## Screenshots

## Requirements
- Node.js
- ExpressJS
- MongoDB

## Installation

Just install `webcv` using npm:

````
npm install webcv --save
```

## Execution
```javascript
webcv(app, [opt])
```

##### Parameters
- `app` - ExpressJS handler.
- `opt` - Options (optional)
 -  {string} `url` - Route to access CV (default 'cv').
 - {string} `filename` - JSON file with CV contents (default 'webcv.json').
 - {boolean} `listen` - Whether or not execure ExpressJS listen (default false).
 - {int} `port` - Port to listen to (default 3000).

## Example usage


Create an `app.js` file, add requires for `express` and `webcv` and create the `express` handler:

```javascript
var express = require('express');
var webcv = require('webcv');

var app = express();
```

Create an object with your customize options and call the `webcv` constructor:

```javascript

opt = {listen: true, port: 8080, filename: 'cv.json', url: 'cv'};
webcv(app, opt);

```

From shell, create `data` folder in your project root and execute MongoDB daemon:

```shell
mkdir data
mongod --dbpath data/
```

Execute script in a different terminal:
```shell
node app.js
```

Access your CV from [localhost/cv](http://localhost:8080/cv/) and edit it or load JSON from [localhost/cv/#/edit](http://localhost:8080/cv/#/edit)
