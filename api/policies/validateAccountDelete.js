const { body } = sails.config.constants.Requirement.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async (req, res, proceed) => {
    // Delete Account Validation Rules for Incoming Data
    const deleteAccountRules = [
        body("accountId").notEmpty().withMessage("Invalid AccountId"),
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        deleteAccountRules
    );
};
