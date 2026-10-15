"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const utils_1 = require("../utils/utils");
// Create a new user
const createUser = async (userData, res) => {
    try {
        const existingUser = await user_model_1.User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }
        const hashedPassword = await (0, utils_1.hashPassword)(userData.password);
        const user = new user_model_1.User({
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
        });
        await user.save();
        const token = (0, utils_1.generateToken)(user._id.toString(), user.name, user.email);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true, // use HTTPS only
            sameSite: "strict",
            maxAge: 3600000, // 1 hour in milliseconds
        });
        return {
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }
    catch (error) {
        throw error;
    }
};
exports.createUser = createUser;
// Authenticate user login
const loginUser = async (email, password, res) => {
    try {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await (0, utils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = (0, utils_1.generateToken)(user._id.toString(), user.name, user.email);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true, // use HTTPS only
            sameSite: "none",
            maxAge: 3600000, // 1 hour in milliseconds
        });
        return {
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }
    catch (error) {
        throw error;
    }
};
exports.loginUser = loginUser;
// Get user by ID
const getUserById = async (userId) => {
    try {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            return null;
        }
        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=user.service.js.map