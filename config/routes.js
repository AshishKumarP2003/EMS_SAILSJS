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

  /**********************************************************************************************************
  *                                                                                                         *
  * Make the view located at `views/homepage.ejs` your home page.                                           *
  *                                                                                                         *
  * (Alternatively, remove this and add an `index.html` file in your                                        *
  * `assets` directory)                                                                                     *
  *                                                                                                         *
  ***********************************************************************************************************/

  'GET /'                               : { view: 'pages/index' },
  'GET /register'                       : { view: 'pages/register', policy: 'isLoggedIn' },
  'GET /login'                          : { view: 'pages/login', policy: 'isLoggedIn' },
  'GET /logout'                         : 'UserController.logout',
  'GET /dashboard'                      : 'DashboardController.index',
  'GET /account'                        : 'AccountController.index',
  'GET /account/:id'                    : 'AccountOverviewController.index',
  'GET /account/:id/transaction'        : 'TransactionController.index',
  

  /***********************************************************************************************************
  *                                                                                                          *
  * More custom routes here...                                                                               *
  * (See https://sailsjs.com/config/routes for examples.)                                                    *
  *                                                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it                                   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does                                  *
  * not match any of those, it is matched against static assets.                                             *
  *                                                                                                          *
  ***********************************************************************************************************/

  'POST /register'                                          : 'UserController.createUser',
  'POST /login'                                             : 'UserController.authenticateUser',

  'PUT /account/add'                                        : 'AccountController.addAccount',
  'POST /account/search'                                    : 'AccountController.searchAccount',
  'PATCH /account/:id/update'                               : 'AccountOverviewController.updateAccount',
  'DELETE /account/:id/delete'                              : 'AccountOverviewController.deleteAccount',

  'PUT /account/:id/transaction/add'                        : 'TransactionController.addTransaction',
  'POST /account/:id/transaction/search'                    : 'TransactionController.searchTransaction',
  'PATCH /account/:id/transaction/:transactionId/update'    : 'TransactionController.updateTransaction',
  'DELETE /account/:id/transaction/:transactionId/delete'   : 'TransactionController.deleteTransaction',
};
