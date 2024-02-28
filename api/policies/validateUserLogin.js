const { body } = sails.config.requirements.expressValidator;

module.exports = async (req, res, proceed) => {
    // LOGIN Validation Rules for Incoming Data
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
