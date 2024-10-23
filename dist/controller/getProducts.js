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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const userModel_1 = require("../models/userModel");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const useremail = user === null || user === void 0 ? void 0 : user.email;
        if (!user) {
            throw new ApiError_1.ApiError(401, 'User not authenticated');
        }
        // Populate productArray to get full product details instead of just IDs
        const populatedUser = yield userModel_1.User.findOne({ email: useremail }).populate('productArray'); // Assuming productArray is an array of product IDs
        const apiResponse = new ApiResponse_1.ApiResponse(200, populatedUser === null || populatedUser === void 0 ? void 0 : populatedUser.productArray, "Products fetched successfully");
        return res.status(200).json(apiResponse);
    }
    catch (error) {
        console.log(error.message);
        throw new ApiError_1.ApiError(400, 'Error while fetching products');
    }
});
exports.getProducts = getProducts;
