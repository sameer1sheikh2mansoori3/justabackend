"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerUser_1 = require("../controller/registerUser");
const loginUser_1 = require("../controller/loginUser");
const router = (0, express_1.Router)();
router.route('/register').post(registerUser_1.registerUser);
router.post('/login', loginUser_1.loginUser);
exports.default = router;
