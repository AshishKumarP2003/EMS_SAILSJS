/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { jwt, dotenv, bcrypt } = sails.config.requirements;
const ResponseCode = sails.config.constants.ResponseCode;
dotenv.config();

module.exports = {
    /**
     * @name createUser
     * @file UserController.js
     * @param {Request} req
     * @param {Response} res
     * @throws NotAuthorizedException
     * @description This method will create a new user. Required to pass a Unregistered Email, Name and Password.
     * @author Ashish Kumar Patel (Zignuts)
     */
    createUser: async (req, res) => {
        const { name, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
    
        try {
            await User.findOrCreate(
                { email: email },
                {
                    name: name,
                    email: email,
                    password: hashPassword,
                }
            ).exec((error, data, wasCreated) => {
                if (error) {
                    throw error;
                }
                if (wasCreated) {
                    console.log("🆕 Signup Successful");
                    res
                        .status(ResponseCode.OK)
                        .json({ type: "success", message: "SignUp Successful." });
                } else {
                    console.log("User Already Exists.");
                    res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "User Already Exists." });
                }
            });
        } catch (error) {
            console.log("Add New User Error: " + error);
            res.status(ResponseCode.SERVER_ERROR).json({ type: "error", message: "Something went wrong" });
        }
    },

    /**
     * @name authenticateUser
     * @file UserController.js
     * @param {Request} req
     * @param {Response} res
     * @throws NotAuthorizedException
     * @description This method will create a new user. Required to pass a valid Email and Password.
     * @author Ashish Kumar Patel (Zignuts)
     */
    authenticateUser: async (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });
            console.log(user);
            if (user) {
                console.log("user found");
                if (await bcrypt.compare(password, user.password)) {
                    console.log(process.env.JWT_SECRET_KEY);
                    const token = jwt.sign(
                        { userId: user.id, email: email, name: user.name },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "24h" }
                    );
                    if (token) {
                        const updateToken = await User.updateOne({ email: email }).set({
                            accessToken: token,
                        });
                        console.log(updateToken);
                        if (updateToken) {
                            console.log("Authorization cookies setting");
                            res.cookie('Authorization', token, {
                                path: '/',
                                maxAge: 1*60*60*1000,
                                secure: true
                              });
                              console.log("Rd")
                            res
                                .status(ResponseCode.OK)
                                .json({
                                    type: "success",
                                    message: "Login Successful",
                                    url: "/dashboard",
                                });
                        } else {
                            console.log("Token Updation Failed");
                            res.status(ResponseCode.CONFLICT).json({ type: "error", message: "Something went wrong" });
                        }
                    }
                } else {
                    res
                        .status(ResponseCode.UNAUTHORIZED)
                        .json({ type: "error", message: "Invalid Credentials" });
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({ type: "error", message: "Invalid Credentials" });
            }
        } catch (error) {
            console.log("Login Error User: ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({ type: "error", message: "Something went wrong" });
        }
    },
};
