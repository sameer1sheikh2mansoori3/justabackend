"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token, "this is my token");
    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
        return; // Explicitly return to ensure the function doesn't continue
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secret'); // Cast to your JWT payload type
        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
            return; // Explicitly return to avoid execution continuing
        }
        console.log(decoded, "this is our decoded");
        req.userId = decoded; // Assuming JWT contains a userId
        next(); // Call next() to proceed to the next middleware
    }
    catch (error) {
        console.error("Error in verifyToken: ", error);
        res.status(500).json({ success: false, message: "Server error" });
        return; // Ensure the function returns after sending a response
    }
};
exports.verifyJWT = verifyJWT;
