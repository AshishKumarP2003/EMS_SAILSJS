module.exports = async (req, res, proceed) => {
    console.log("🔄 Account Check Started...");

    console.log('Check Middleware', req.params.id, req.user.userId);
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