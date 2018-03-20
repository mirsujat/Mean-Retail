# MEAN Retail

#### A mini shopping cart application using the MEAN Stack

Users of this application will be able to browse through products, add products to their cart, and even check out using the Stripe API.
This application is built with REST API, a desktop web client using AngularJS, and even a mobile app using the Ionic framework.

## Features

* [MongoDB](https://www.mongodb.org/);
* [Mongoose](http://mongoosejs.com/) as the mongodb ODM for node.js;
* [AngularJS](https://angularjs.org/) to implement the desktop web client;
* [Ionic](http://ionicframework.com/) to develop the hybrid mobile app;
* [Express](http://expressjs.com/) to build the REST API;
* [Node.js](https://nodejs.org/en/);
* [Passport](http://passportjs.org/) to handle authentification for node.js;
* [Gulp](http://gulpjs.com/) to define and automate tasks;
* [Mocha](https://mochajs.org/) as the test framework for the server part;

## Usage

Clone the repo, then run:

```
# Install dependencies
npm install && bower install

# Start a mongodb instance
mongod

# Start the server
npm start
```

That will build the client app and fire up the node server. You can view the app in the browser at `http://localhost:3000`.

## File Structure

```
mean-retail/
 ├──app/                       * Folder for the models and API routes
 │   ├──models/                * Folder defining mongoose schemas and models
 |   |    ├──category.js       * Defines the category schema
 |   |    ├──models.js         * Defines models based on mongoose schemas
 |   |    ├──product.js        * Defines the product schema
 |   |    └──user.js           * Defines the user schema
 |   |
 |   └──api.js/                * Defines the REST API endpoints
 |  
 |──config/                    * Configurations for the server
 |   ├──auth.js                * Handles Facebook authentification strategy with passport
 |   ├──config.example.json    * Sets API keys
 |   ├──dependencies.js        * Bundles deps into a wagner-core factory
 |   └──fx.js                  * Retrieves exchange rates through OpenExchangeRate API
 │
 |──public/                    * Folder for the AngularJS web client
 |   ├──bin/                   * Folder for compiled output
 |   |                     
 |   ├──css/                   * Folder for stylesheets
 |   |   └──styles.css/        * Main styles
 |   |
 |   ├──js/                    * Folder for the AngularJS code
 |   |   ├──app.js             * Entry file for the application
 |   |   ├──controllers.js     * Defines AngularJS controllers
 |   |   ├──directives.js      * Defines AngularJS directives
 |   |   └──services.js        * Defines AngularJS services
 |   |
 |   ├──views/                 * Templates
 |   |                         
 |   └──index.html             * The index HTML page that includes the bundle
 |
 ├──.bowerrc                   * Bower configurations file
 ├──bower.json                 * What bower uses to manage it's dependencies
 ├──gulpfile.js                * Automates tasks
 ├──package.json               * What npm uses to manage it's dependencies
 ├──server.js                  * Main file for the node.js server
 └──test.js                    * Tests file for the server
```

## Tests

The tests for the server use Mocha. See the `./test.js` file. The test suite can be run in watch mode (tests will re-run each time a file changes), using:

```
gulp watch:server
or
npm run watch
```
