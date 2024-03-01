const { body } = sails.config.constants.Requirement.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async (req, res, proceed) => {
    // Update Account Validation Rules for Incoming Data
    const updateAccountRules = [
        body("accountId").notEmpty().withMessage("Account Id is Required"),
        body("accountName").notEmpty().withMessage("Account Name is Required"),
        body("accountType").notEmpty().withMessage("Account Type is Required"),
        body("accountType").isIn(["Saving", "Current", "Cash Account", "Credit Card", "Other"]),
        body("accountNumber").notEmpty().withMessage("Account Number is Required"),
        body("accountNumber").isNumeric().withMessage("Account Number should be numeric"),
        body("accountNumber").isLength({ min: 6 }).withMessage('Account number must be at least 6 characters'),
        body("accountHolder").notEmpty().withMessage("Account Holder Name is Required"),
        body("accountDescription").notEmpty().withMessage("Account Description is Required"),
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        updateAccountRules
    );
};
