const { body } = sails.config.constants.Requirement.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async function (req, res, proceed) {
    console.log("Register Rules application");

    // Register Validation Rules for Incoming Data.
    const registerRules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").notEmpty().withMessage("Email is required"),
        body("email").isEmail().withMessage("Invalid Email Address"),
        body("password").notEmpty().withMessage("Password is required"),
        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password and Confirm Password must match");
            }
            return true;
        })
    ];

    console.log("Validation processing...");
    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        registerRules
    );
};
