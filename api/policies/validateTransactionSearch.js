const { body } = sails.config.requirements.expressValidator;

module.exports = async (req, res, proceed) => {
    // LOGIN Validation Rules for Incoming Data
    const searchTransactionsRules = [
        body('accountId').notEmpty().withMessage('Account Id is required'),
        body('category').notEmpty().withMessage('Search Text is required')
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        searchTransactionsRules
    );
};
