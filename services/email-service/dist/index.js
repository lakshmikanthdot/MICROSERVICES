"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const email_config_1 = require("./config/email.config");
const rabbitmq_1 = require("./config/rabbitmq");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "email-service" });
});
// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down Email Service...");
    (0, rabbitmq_1.closeRabbitMQ)();
    process.exit(0);
});
// Start server
const startServer = async () => {
    try {
        (0, email_config_1.initializeEmailTransporter)();
        await (0, rabbitmq_1.connectRabbitMQ)();
        await (0, rabbitmq_1.consumeFromQueue)();
        app.listen(PORT, () => {
            console.log(`Email Service running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start Email Service:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map