import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { IUser, User } from "../models/userModel";
import { ApiError } from "../utils/ApiError";
interface CustomRequest extends Request {
    token?: string;
    user?:IUser  // Optional token property
}
interface Verify{
    _id:string
}
export const verifyJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('authorization')
   
    
    req.token = token
    
    const verified =  jwt.verify(token || "" , 'secret')
    const findUser = await User.findById({
        _id :verified
    })
    
    if( !findUser ){
        throw new ApiError(404 , "user is unathorized ")
    }
    req.user = findUser
    next();


}

