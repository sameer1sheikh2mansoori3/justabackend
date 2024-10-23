"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, email, password } = req.body;
        const findUser = yield userModel_1.User.findOne({ email });
        console.log(findUser, "my find user");
        if (findUser) {
            const findRes = new ApiResponse_1.ApiResponse(409, findUser, "user with this email is already exist");
            return res.status(409).json(findRes);
        }
        const createdUser = yield userModel_1.User.create({
            username,
            email,
            password
        });
        const userId = (_a = createdUser._id) === null || _a === void 0 ? void 0 : _a.toString();
        console.log(userId, "my userId");
        const token = jsonwebtoken_1.default.sign(userId, 'secret');
        const apiResponse = new ApiResponse_1.ApiResponse(200, {
            data: token
        }, "user created successfully");
        return res.status(200).json({
            message: apiResponse
        });
    }
    catch (error) {
        console.log(error);
        throw new ApiError_1.ApiError(404, "error in post");
    }
});
exports.registerUser = registerUser;
