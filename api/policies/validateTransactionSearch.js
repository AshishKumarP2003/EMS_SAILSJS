const { body } = sails.config.constants.Requirement.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async (req, res, proceed) => {
    // Search Transaction Validation Rules for Incoming Data
    const searchTransactionsRules = [
        body('category').notEmpty().withMessage('Search Text is required')
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        searchTransactionsRules
    );
};
