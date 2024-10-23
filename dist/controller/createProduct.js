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
exports.createProduct = void 0;
const productModel_1 = require("../models/productModel");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, quantity, productNumber } = req.body;
        const token = req.token;
        const user = req.user;
        const product = yield productModel_1.Product.create({ productName, productNumber, quantity });
        user === null || user === void 0 ? void 0 : user.productArray.push(product._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        const resPonse = new ApiResponse_1.ApiResponse(200, user, "product added successfully");
        return res.status(200).json(resPonse);
    }
    catch (error) {
        console.error(`error while creating Products ${error}`);
        throw new ApiError_1.ApiError(404, "error while creating Product");
    }
});
exports.createProduct = createProduct;
