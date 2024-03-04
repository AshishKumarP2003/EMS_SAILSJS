module.exports = async (req, res, proceed) => {
    // This Method will only be executed for the authenticated user.
    console.log("🔄 Transaction Check Started...");

    console.log('Check Middleware => { transactionId: ', req.params.transactionId, ", userId: ", req.user.userId, " }");

    // Check whether the transaction is acutally their own account. If Not Redirect to their transaction page.
    try {
        const isCorrectTransaction = await Transaction.findOne().where({ id: req.params.transactionId, accountId: req.params.id})
        if (isCorrectTransaction == null) {
            console.log("⏩ Requested Forwarded to Controller...")
            res.redirect(`/account/${req.params.id}/transaction`)
        } else {
            proceed();
        }
    } catch (error) {
        return res.redirect(`/account/${req.params.id}/transaction`);
    }

    console.log("✅ Transaction Check Done...")
}