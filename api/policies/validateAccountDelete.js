const { body } = sails.config.requirements.expressValidator;

module.exports = async (req, res, proceed) => {
    // LOGIN Validation Rules for Incoming Data
    const loginRules = [
        body("accountId").notEmpty().withMessage("Invalid AccountId"),
        
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        loginRules
    );
};
