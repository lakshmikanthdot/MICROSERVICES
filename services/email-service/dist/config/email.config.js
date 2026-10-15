"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = exports.initializeEmailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter = null;
// Initialize email transporter
const initializeEmailTransporter = () => {
    try {
        transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        console.log('Email Service: Email transporter initialized');
    }
    catch (error) {
        console.error('Email Service: Failed to initialize email transporter:', error);
    }
};
exports.initializeEmailTransporter = initializeEmailTransporter;
// Get email transporter
const getTransporter = () => {
    return transporter;
};
exports.getTransporter = getTransporter;
//# sourceMappingURL=email.config.js.map