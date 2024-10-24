"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
// Define allowed origins (without the trailing slash)
const allowedOrigins = [
    "http://localhost:5173", // No trailing slash
    // No trailing slash
    // Add more allowed origins here
];
// CORS middleware should be configured before routes
app.use((0, cors_1.default)({
    origin: allowedOrigins, // Allow specified origins
    credentials: true, // Allow cookies or HTTP authentication
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
}));
app.use((0, cookie_parser_1.default)());
// Body parser middleware
app.use(express_1.default.json({ limit: "16kb" }));
// Define your routes after CORS middleware
app.use('/api/v1/user', userRoutes_1.default);
app.use('/api/v1/product', productRoutes_1.default);
// Example route for testing
app.get('/', (req, res) => {
    res.send('hi there');
});
