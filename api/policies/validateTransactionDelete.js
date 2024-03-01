const { body } = sails.config.constants.Requirement.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async (req, res, proceed) => {
    // Delete Transaction Validation Rules for Incoming Data
    const deleteTransactionRules = [
        body("transactionId").notEmpty().withMessage("transactionId is required"),
        body("accountId").notEmpty().withMessage("AccountId is required"),
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        deleteTransactionRules
    );
};
