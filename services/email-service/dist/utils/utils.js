"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.getUserInfo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Fetch user information from user service
const getUserInfo = async (event) => {
    try {
        const token = event.cookies?.authToken;
        const user = jsonwebtoken_1.default.decode(token);
        return user;
    }
    catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};
exports.getUserInfo = getUserInfo;
// Format date for email
const formatDate = (date) => {
    if (!date)
        return "No due date";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
exports.formatDate = formatDate;
//# sourceMappingURL=utils.js.map