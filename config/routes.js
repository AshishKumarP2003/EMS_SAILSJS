/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': { view: 'pages/index' },
  'GET /register': { view: 'pages/register' },
  'GET /login': { view: 'pages/login' },
  'GET /dashboard': 'DashboardController.index',
  'GET /account': 'AccountController.index',
  'GET /account/:id': 'AccountOverviewController.index',
  'GET /transaction/:id': 'TransactionController.index',
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'POST /register': 'UserController.createUser',
  'POST /login': 'UserController.authenticateUser',

  'PUT /account/add': 'AccountController.addAccount',
  'POST /account/search' : 'AccountController.searchAccount',
  'PATCH /account/update': 'AccountOverviewController.updateAccount',
  'DELETE /account/delete': 'AccountOverviewController.deleteAccount',

  'PUT /transaction/add': 'TransactionController.addTransaction',
  'POST /transaction/search' : 'TransactionController.searchTransaction',
  'PATCH /transaction/update': 'TransactionController.updateTransaction',
  'DELETE /transaction/delete': 'TransactionController.deleteTransaction',
};
