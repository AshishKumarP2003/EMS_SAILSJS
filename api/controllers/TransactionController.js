/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
    console.log(req.params.id);
    try {
      const data = await Transaction.find().where({
        accountId: req.params.id,
      });
      console.log(data);
      if (data) {
        transactionData = data;
      }

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
          .status(200)
          .json({ type: "success", message: "Transaction Added Successfully" });
      } else {
        res
          .status(500)
          .json({ type: "error", message: "Transaction Add Failed" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
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

        res.status(200).json({
          type: "success",
          message: "Transaction Updated Successfully",
        });
      } else {
        res
          .status(500)
          .json({ type: "error", message: "Transaction Updated Failed" });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
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
      const add = await Transaction.destroyOne({
        id: req.body.transactionId,
      });
      console.log(add);
      if (add) {
        await sails.config.services.balance.updateBalance(accountId);
        res.status(200).json({
          type: "success",
          message: "Transaction Deleted Successfully",
        });
      } else {
        res
          .status(500)
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
