const { body } = sails.config.requirements.expressValidator;

module.exports = async function (req, res, proceed) {
    console.log("Register Rules application");
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
