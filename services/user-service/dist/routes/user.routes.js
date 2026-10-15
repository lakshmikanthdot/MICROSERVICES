"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const router = (0, express_1.Router)();
// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ error: "Email, password, and name are required" });
            return;
        }
        const result = await (0, user_service_1.createUser)({ email, password, name }, res);
        res.status(201).json(result);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        const result = await (0, user_service_1.loginUser)(email, password, res);
        res.status(200).json(result);
    }
    catch (error) {
        const err = error;
        res.status(401).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map