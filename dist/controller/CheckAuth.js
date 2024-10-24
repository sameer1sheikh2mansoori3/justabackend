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
exports.checkAuth = void 0;
const userModel_1 = require("../models/userModel");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.userId, "is our userId");
        const user = yield userModel_1.User.findById(req === null || req === void 0 ? void 0 : req.userId).select("-password");
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, user });
        return;
    }
    catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error });
    }
});
exports.checkAuth = checkAuth;
