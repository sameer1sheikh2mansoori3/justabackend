import { Response, Request } from "express"
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/userModel";
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongoose";
import { sign } from "crypto";
interface User{
    username:string;
    email:string;
    password:string;
    _id:ObjectId;
    _v:number | undefined;
}

const loginUser = async(req: Request, res: Response): Promise<any> => {

    try {
        const {  email, password } = req.body;
     const findUser : User | null = await User.findOne({email})
     if( findUser?._id === null ){
        const nouserRes = new ApiResponse(404 , {
            findUser
        } , "user not found")
        return res.status(200).json(nouserRes);
     }

    
  if( findUser?._id !== null ){
    const userId = findUser?._id.toString() || "" 
    const token =  jwt.sign(userId  , 'secret' )
      const apiResponseUser = new ApiResponse(200 , {
        data:token
     },
    "welcome back logged in user")
       return res.status(200).json({
        message : apiResponseUser
       })
  }
    
    
    
    } catch (error) {
        console.log(error)
        throw new ApiError(404, "error while login user")
    }

}

export { loginUser };