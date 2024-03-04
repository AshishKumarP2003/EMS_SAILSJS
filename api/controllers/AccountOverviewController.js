/**
 * AccountOverviewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ResponseCode = sails.config.constants.ResponseCode;

module.exports = {
    /**
     * @name index
     * @file AccountOverviewController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method provide AccountOverview View Page File to the client.
     * @author Ashish Kumar Patel (Zignuts)
     */
    index: async (req, res) => {
        let accountInfo = [];
        try {
            const info = await Account.findOne().where({ id: req.params.id });
            if (info) {
                accountInfo = info;
            }
        } catch (error) {
            console.log(error);
        }
        return res.view("pages/accountOverview", {
            page: "Accounts",
            user: req.user,
            accountData: accountInfo,
        });
    },

    /**
     * @name updateAccount
     * @file AccountController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method will update existing user Account. Required to pass a AccountId, Account Name, Account type, Account Number, Account Holder, Bank Name: "" || "Some Bank", Account Description.
     * @author Ashish Kumar Patel (Zignuts)
     */
    updateAccount: async (req, res) => {
        const {
            accountName,
            accountType,
            accountNumber,
            accountHolder,
            bankName,
            accountDescription,
        } = req.body;
        console.log(req.user.userId, req.params.id);
        console.log(req.body);
        try {
            const add = await Account.updateOne({
                userId: req.user.userIsd,
                id: req.params.id,
            }).set({
                accountName: accountName,
                accountType: accountType,
                accountNumber: accountNumber,
                accountHolder: accountHolder,
                bankName: bankName,
                currentBalance: 0,
                accountDescription: accountDescription,
            });
            if (add) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Account Updated Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Account Updated Failed",
                });
            }
        } catch (error) {
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: "Something went wrong...",
            });
        }
    },

    /**
     * @name deleteAccount
     * @file AccountController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method will delete existing user Account. Required to pass a AccountId.
     * @author Ashish Kumar Patel (Zignuts)
     */
    deleteAccount: async (req, res) => {
        console.log("Body:", req.body);
        try {
            const deleteTransactions = await Transaction.destroy({
                accountId: req.params.id,
            });
            const deleteaccount = await Account.destroy({
                userId: req.user.userId,
                id: req.params.id,
            }).fetch();
            console.log("Deleted Account => ", deleteaccount);
            if (deleteaccount) {
                await sails.config.services.balance.updateBalance(
                    req.params.id
                );
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Account Deleted Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Account Delete Failed",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: "Something went wrong...",
            });
        }
    },
};
