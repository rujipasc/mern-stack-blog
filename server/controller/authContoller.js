const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    try {
        const { username, password } = req.body;
        // Initialize token variable
        let token;

        if (password === process.env.PASSWORD) {
            token = jwt.sign({ username }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            // Moved the success response here to ensure token scope is correctly handled
            return res.status(200).json({ username, token, success: "Login successful"});
        } else {
            // If credentials are invalid, send a 400 error
            return res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (e) {
        // Catch block for handling unexpected errors
        res.status(500).json({ error: `${e.message}` }); // Changed `${e}` to `${e.message}` for better error readability
    }
};

