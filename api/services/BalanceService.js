// api/services/BalanceService.js

module.exports = {
  updateBalance: async (accountId) => {
    try {
      const creditAmount =
        (await Transaction.sum("amount").where({
          transactionType: "Credit", accountId: accountId
        })) || 0;
      console.log("Credit Amount: ", creditAmount);
      const debitAmount =
        (await Transaction.sum("amount").where({
          transactionType: "Debit", accountId: accountId
        })) || 0;
      console.log("Debit Amount: ", debitAmount);
      console.log("Total Amount: ", creditAmount - debitAmount);

      const updateCurrentBalance = await Account.updateOne({
        id: accountId,
      }).set({
        currentBalance: creditAmount - debitAmount,
      });
      if (updateCurrentBalance) {
        console.log("Current Balance updated successfully");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Balance Update Error => ", error.message);
      return false;
    }
  },
};
