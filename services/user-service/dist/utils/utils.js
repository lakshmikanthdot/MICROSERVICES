"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 10;
// Hash a password using bcrypt
const hashPassword = async (password) => {
    return await bcrypt_1.default.hash(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
// Compare a plain text password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
// Generate a JWT token
const generateToken = (userId, name, email) => {
    const secret = process.env.JWT_SECRET || "default_secret";
    return jsonwebtoken_1.default.sign({ userId, name, email }, secret, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
// Verify a JWT token
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || "default_secret";
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=utils.js.map