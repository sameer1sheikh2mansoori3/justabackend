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
exports.Logout = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const Logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        res.cookie('token', null);
        const resPonse = new ApiResponse_1.ApiResponse(200, userId, 'logout successfully');
        res.status(200).json(resPonse);
        console.log(userId);
        return;
    }
    catch (error) {
        console.log("Error in logout ", error);
        res.status(400).json({ success: false, message: error });
    }
});
exports.Logout = Logout;
