import { Request ,  Response , NextFunction } from "express"
import { User } from "../models/userModel"
import { ApiResponse } from "../utils/ApiResponse"
interface CustomReq extends Request{
    userId? : any
}

export const Logout = async(req :CustomReq , res : Response , next : NextFunction)=>{

 try {
    const userId = req.userId
    res.cookie('token' , null)
    const resPonse = new ApiResponse( 200 , userId , 'logout successfully')
    res.status(200).json(resPonse)
    console.log(userId)
    return 
 } catch (error) {
    console.log("Error in logout ", error);
		res.status(400).json({ success: false, message: error});
 }
   



}