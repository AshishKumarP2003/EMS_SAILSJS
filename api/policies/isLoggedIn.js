const { jwt, dotenv } = sails.config.constants.Requirement;
const publicRoutes = sails.config.constants.PublicRoutes;

dotenv.config();

module.exports = async (req, res, proceed) => {
    console.log("🔄 Middleware is running");

    // Check if the user is authenticated.
    const token = req.cookies.Authorization;

    // If the user try to access login page and is already authenticated, redirect to dashboard page.
    if (token && publicRoutes.includes(req.url)) {
        return res.redirect("/dashboard");
    }
    // if the user is not authenticated and try to access login page, let him proceed with it.
    else if (!token && publicRoutes.includes(req.url)) {
        proceed();
    }
    // All the other routes need to be authenticated
    else {
        // If there is no token, then redirect to login page.
        if (!token) {
            return res.redirect("/login");
        }

        // Verify the token.
        try {
            // Check if there is any user with this token.
            const tokenfound = await User.findOne({ accessToken: token });
            if (tokenfound) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                req.user = decoded;

                // Forward the request to the destined endpoint.
                console.log("⏩ Requested Forwarded to Controller...");
                proceed();
            } else {
                // Remove the Invalid token from the cookies.
                res.clearCookie("Authorization");
                return res.redirect("/login");
            }
        } catch (error) {
            console.log("Error is :", error);
            return res.redirect("/");
        }
        console.log("✅ Middleware is done running.");
    }
};
