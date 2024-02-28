/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /**
     * @name index
     * @file DashboardController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method provide Dashboard View Page File to the client.
     * @author Ashish Kumar Patel (Zignuts)
     */
    index: async (req, res) => {

        totalAccounts = 0;
        totalBalance = 0;

        try{
            totalAccounts = await Account.count().where({userId: req.user.userId});
            totalBalance = await Account.sum('currentBalance').where({userId: req.user.userId});
        } catch (error) {
            console.log(error);
        }

        return res.view("pages/dashboard", {page: "Dashboard", totalAccounts: totalAccounts, totalBalance: totalBalance});
    },
};
