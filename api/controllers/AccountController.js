/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ResponseCode = sails.config.constants.ResponseCode;

module.exports = {

    /**
     * @name index
     * @file AccountController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method provide Accounts List to the Accounts View Page File.
     * @author Ashish Kumar Patel (Zignuts)
     */
    index: async (req, res) => {
        // Initial Accounts list Array.
        let accountsList = [];
        try {
            // Fetching the Account Lists of Logged In User.
            const list = await Account.find().where({ userId: req.user.userId });
            if (list) {
                console.log("👁️/accounts => Accounts Page ")

                // Overwriting the Account List Array with Fetch Data.
                accountsList = list;
            } 
        } catch (error) {
            // Debug: Console if any error occurs.
            console.log(error.message)
        }


        return res.view('pages/accounts', {page: "Accounts", user: req.user, accountsList: accountsList})
    },

    /**
     * @name addAccount
     * @file AccountController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method will create a new user. Required to pass a Unregistered Email, Name and Password.
     * @author Ashish Kumar Patel (Zignuts)
     */
    addAccount : async (req, res) => {
        const { accountName, accountType, accountNumber, accountHolder, bankName, accountDescription } = req.body;
        console.log("Req, user =>  ", req.user)
    
        try {
            const add = await Account.create({userId: req.user.userId, accountName: accountName, accountType: accountType, accountNumber: accountNumber, accountHolder: accountHolder, bankName: bankName, currentBalance: 0 , accountDescription: accountDescription}).fetch();
            console.log(add);
            if (add) {
                res.status(ResponseCode.OK).json({type: 'success', message: "Account Added Successfully"})
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({type: 'error', message: "Account Add Failed"});
            }
        } catch (error) {
            console.log('Add Account Error => ', error.message)
            res.status(ResponseCode.SERVER_ERROR).json({type: "error", message: "Something went wrong..."});
        }
    },

    /**
     * @name searchAccount
     * @file AccountController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method will return the Array of Account that matches the Criteria. Required to pass a accountName and with valid AccountId.
     * @author Ashish Kumar Patel (Zignuts)
     */
    searchAccount : async (req, res) => {
        console.log(req.body)
        try {
            const accountsList = await Account.find().where({ userId: req.user.userId, accountName: { contains: req.body.accountName }});
            console.log(accountsList);
            if (accountsList) {
                res.status(ResponseCode.OK).json({type: 'success', data: accountsList}) ;
            } else {
            return [];
            }
        } catch (error) {
            console.log(error)
            return [];
        }
    }
};

