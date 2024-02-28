const { body } = sails.config.requirements.expressValidator;

module.exports = async (req, res, proceed) => {
    // LOGIN Validation Rules for Incoming Data
    const updateTransactionRules = [
        body("transactionId").notEmpty().withMessage("Invalid Id"), 
        body("accountId").notEmpty().withMessage("Invalid Id"),
        body("category").notEmpty().withMessage("Please enter Category"),
        body("amount").notEmpty().withMessage("Please provide amount"),
        body("source").notEmpty().withMessage("Source is required"),
        body("datetime").notEmpty().withMessage("Date and time is required"),
        body("paymentMethod")
            .isIn(["Online", "Cash", "Cheque", "Other"])
            .withMessage("Please provide correct Payment Method"),
        body("transactionType")
            .notEmpty()
            .withMessage("Transaction Type is required"),
        body("transactionType")
            .isIn(["Debit", "Credit"])
            .withMessage("Please Provide Transaction Type"),
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        updateTransactionRules
    );
};
