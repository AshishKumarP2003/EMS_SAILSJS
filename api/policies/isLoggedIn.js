const {jwt, dotenv} = sails.config.requirements;
dotenv.config();

module.exports = async (req, res, proceed) => {
    console.log("🔄 Middleware is running")
    
    // Check if the user is authenticated.
    const token = req.cookies.Authorization;

    // If there is no token, then redirect to login page.
    if (!token) {
        return res.redirect('/login');
    }

    // Verify the token.
    try {
        const tokenfound = await User.findOne({accessToken: token});
        if (tokenfound) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            // Forward the request to the destined endpoint.
            console.log("⏩ Requested Forwarded to Controller...")
            proceed();
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log('Error is :', error)
        return res.redirect('/');
    }
    console.log("✅ Middleware is done running.")
} 