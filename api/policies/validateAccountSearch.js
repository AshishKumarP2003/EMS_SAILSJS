const { body } = sails.config.requirements.expressValidator;

module.exports = async (req, res, proceed) => {
    // LOGIN Validation Rules for Incoming Data
    const searchAccountsRules = [
        body("accountName").notEmpty().withMessage("Search Text is required"),
        
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        searchAccountsRules
    );
};
