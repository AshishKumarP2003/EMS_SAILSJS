const { body } = sails.config.constants.Requirement.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async (req, res, proceed) => {
    // Login Validation Rules for Incoming Data
    const loginRules = [
        body("email").notEmpty().withMessage("Email is required"),
        body("email").isEmail().withMessage("Invalid Email Address"),
        body("password").notEmpty().withMessage("Password is required"),
    ];

    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        loginRules
    );
};
