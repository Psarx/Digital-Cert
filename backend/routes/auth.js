
const express = require("express");
const User = require("../models/user");
const CellCoordinator = require("../models/cellCoordinator"); 
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module
const authRouter = express.Router();


authRouter.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        res.status(200).json(users); // Respond with the fetched users
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
});

authRouter.post("/api/adminlogin", async (req, res) => {
    try {
        // Extracting username, password, and role from request body
        const { username, password, role } = req.body;

        // Finding user in the database based on username and role
        const user = await User.findOne({ username, role });

        // If no user is found, return status 400 with a message
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // If the provided password does not match the user's password, return status 400 with a message
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generating a JWT token with the user's ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Returning the token and user object (excluding password) as JSON
        res.json({ token, ...user._doc });
    }
    catch (err) {
        // If an error occurs, return status 500 with an error message
        res.status(500).json({ message: err.message });
    }
});

authRouter.post("/api/cellcoordlogin", async (req, res) => {
    try {
        // Extracting username, password, and role from request body
        const { username, password } = req.body;

        // Finding user in the database based on username and role
        const user = await User.findOne({ username });

        // If no user is found, return status 400 with a message
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // If the provided password does not match the user's password, return status 400 with a message
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generating a JWT token with the user's ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Returning the token and user object (excluding password) as JSON
        res.json({ token, ...user._doc });
    }
    catch (err) {
        // If an error occurs, return status 500 with an error message
        res.status(500).json({ message: err.message });
    }
});

authRouter.post('/api/users', async (req, res) => {
    try {
        // Extract data from request body
        const { username, password, role } = req.body;

        // Check if the role is "cell coordinator"
        if (role === "cell coordinator") {
            // Find if the username exists in the cellCoordinator database
            const existingCoordinator = await CellCoordinator.findOne({ coordinatorName: username });
            if (!existingCoordinator) {
                return res.status(400).json({ message: "Username does not exist in cell coordinators" });
            }
        }

        // Check if the username exists in the user database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
    
        // Create a new user record
        const newUser = new User({
            username,
            password, 
            role
        });
        await newUser.save();
    
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


authRouter.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id; // Extract user ID from request parameters
    const { username, password, role } = req.body; // Extract updated user information from request body

    try {
        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user information
        user.username = username;
        user.password = password;
        user.role = role;

        // Save the updated user to the database
        user = await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
});

module.exports = authRouter;