"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    productArray: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product'
        }]
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
