/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions, unless overridden.       *
     * (`true` allows public access)                                            *
     *                                                                          *
     ***************************************************************************/

    // '*': true,
    UserController: {
        createUser: "validateUserRegister",
        authenticateUser: ["validateUserLogin"],
    },

    DashboardController: {
        index: "isLoggedIn",
    },

    AccountController: {
        index: "isLoggedIn",
        addAccount: ["isLoggedIn", "validateAccountAdd"],
        searchAccount: ["isLoggedIn", "validateAccountSearch"],
    },

    AccountOverviewController: {
        index: ["isLoggedIn", "isValidAccount"],
        updateAccount: ["isLoggedIn", "validateAccountUpdate"],
        deleteAccount: ["isLoggedIn", "validateAccountDelete"],
    },

    TransactionController: {
        index: ["isLoggedIn", "isValidAccount"],
        addTransaction: ["isLoggedIn", "validateTransactionAdd"],
        updateTransaction: ["isLoggedIn", "validateTransactionUpdate"],
        deleteTransaction: ["isLoggedIn", "validateTransactionDelete"],
        searchSearch: ["isLoggedIn", "validateTransactionSearch"],
    },
};
