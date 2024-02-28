const { body } = sails.config.requirements.expressValidator;

module.exports = async (req, res, proceed) => {
    // LOGIN Validation Rules for Incoming Data
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
