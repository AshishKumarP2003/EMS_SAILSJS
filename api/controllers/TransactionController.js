/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ResponseCode = sails.config.constants.ResponseCode;


module.exports = {
  /**
   * @name index
   * @file TransactionController.js
   * @param {Request} req
   * @param {Response} res
   * @throws None
   * @description This method provide Accounts View Page File to the client.
   * @author Ashish Kumar Patel (Zignuts)
   */
  index: async (req, res) => {
    let transactionData = [];
    let totalAmount = 0;

    // Paginations
    let pageNo = req.query.page || 1;
    let pageSize = 3;

    console.log("pageNo => ", pageNo)

    if (pageNo < 0) {
      pageNo = 1;
    } 
    console.log(req.params.id);
    try {
      const data = await Transaction.find().sort('datetime DESC').skip((pageNo-1)*pageSize).limit(pageSize).where({
        accountId: req.params.id,
      });
      console.log(data);
      if (data) {
        transactionData = data;
        for( let i = 0; i < data.length; i++ ) {
          transactionData[i].srNo = (pageNo-1) * 10 + i + 1;
        }
      }
      console.log(transactionData)
      const account = await Account.findOne().where({ id: req.params.id });
      if (account) {
        totalAmount = account.currentBalance;
      }
    } catch (error) {
      console.log(error.message);
    }

    console.log("transactionController");
    res.view("pages/transactions", {
      page: "Accounts",
      user: req.user,
      transactionData: transactionData,
      totalAmount: totalAmount,
      pageNo: pageNo
    });
  },

  /**
     * @name addTransaction
     * @file TransactionController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method will create a new Transaction Record. Required to pass a AccountId, Category, Amount, Source, Datetime, Payment Method, Sender/Recipient Name, Transaction Type: Debit/Credit.
     * @author Ashish Kumar Patel (Zignuts)
     */
  addTransaction: async (req, res) => {
    console.log("Body: ", req.body);
    const {
      accountId,
      category,
      amount,
      source,
      datetime,
      paymentMethod,
      recipientName,
      transactionType,
    } = req.body;

    try {
      const add = await Transaction.create({
        accountId: accountId,
        category: category,
        amount: parseFloat(amount),
        source: source,
        datetime: datetime,
        paymentMethod: paymentMethod,
        recipientName: recipientName,
        transactionType: transactionType,
      }).fetch();
      console.log(add);
      if (add) {
        await sails.config.services.balance.updateBalance(accountId);
        res
          .status(ResponseCode.OK)
          .json({ type: "success", message: "Transaction Added Successfully" });
      } else {
        res
          .status(ResponseCode.SERVER_ERROR)
          .json({ type: "error", message: "Transaction Add Failed" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(ResponseCode.SERVER_ERROR)
        .json({ type: "error", message: "Something went wrong..." });
    }
  },

  // Update Transaction
  updateTransaction: async (req, res) => {
    const {
      category,
      amount,
      source,
      datetime,
      paymentMethod,
      recipientName,
      transactionType,
      transactionId,
      accountId,
    } = req.body;
    try {
      const update = await Transaction.updateOne({ id: transactionId }).set({
        category: category,
        amount: amount,
        source: source,
        datetime: datetime,
        paymentMethod: paymentMethod,
        recipientName: recipientName,
        transactionType: transactionType,
      });
      console.log(update);
      if (update) {
        await sails.config.services.balance.updateBalance(accountId);

        res.status(ResponseCode.OK).json({
          type: "success",
          message: "Transaction Updated Successfully",
        });
      } else {
        res
          .status(ResponseCode.SERVER_ERROR)
          .json({ type: "error", message: "Transaction Updated Failed" });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(ResponseCode.SERVER_ERROR)
        .json({ type: "error", message: "Something went wrong..." });
    }
  },

  /**
   * @name deleteTransaction
   * @file TransactionController.js
   * @param {Request} req
   * @param {Response} res
   * @throws None
   * @description This method will delete existing Account Transaction. Required to pass a Transaction Id.
   * @author Ashish Kumar Patel (Zignuts)
   */
  deleteTransaction: async (req, res) => {
    try {
      console.log(req.body)
      const add = await Transaction.destroyOne({
        id: req.body.transactionId,
      });
      console.log(add);
      if (add) {
        await sails.config.services.balance.updateBalance(req.body.accountId);
        res.status(200).json({
          type: "success",
          message: "Transaction Deleted Successfully",
        });
      } else {
        res
          .status(ResponseCode.SERVER_ERROR)
          .json({ type: "error", message: "Transaction Delete Failed" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ type: "error", message: "Something went wrong..." });
    }
  },

  /**
     * @name searchTransaction
     * @file TransactionController.js
     * @param {Request} req
     * @param {Response} res
     * @throws None
     * @description This method will return the Array of Transactions that matches the Criteria. Required to pass a valid AccountId and Search Text.
     * @author Ashish Kumar Patel (Zignuts)
     */
  searchTransaction: async (req, res) => {
    console.log(req.body);
    try {
      const transactionsList = await Transaction.find().where({
          accountId: req.body.accountId,
          category: { contains: req.body.category },
      });
      if (transactionsList) {

        for (let i = 0; i < transactionsList.length; i++) {
          transactionsList[i].srNo = i+1
        }
        console.log(transactionsList);
        res.json({ type: "success", data: transactionsList });
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
