module.exports = async (req, res, proceed) => {
    // This Method will only be executed for the authenticated user.
    console.log("🔄 Account Check Started...");

    console.log('Check Middleware => { accountId: ', req.params.id, ", userId: ", req.user.userId, " }");

    // Check whether the account is acutally their own account. If Not Redirect to their account page.
    try {
        const isCorrectAccount = await Account.findOne().where({ id: req.params.id, userId: req.user.userId})
        if (isCorrectAccount == null) {
            console.log("⏩ Requested Forwarded to Controller...")
            res.redirect('/account')
        } else {
            proceed();
        }
    } catch (error) {
        return res.redirect("/account");
    }

    console.log("✅ Account Check Done...")
}