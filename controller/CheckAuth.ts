import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
interface CustomeReq extends Request{
    userId? : any
}
export const checkAuth = async (req:CustomeReq, res : Response , next : NextFunction) => {
	try {
        console.log(req.userId , "is our userId")
		const user = await User.findById(req?.userId).select("-password");
		if (!user) {
			res.status(400).json({ success: false, message: "User not found" });
            return;
		}

		res.status(200).json({ success: true, user });
        return
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error});
	}
};