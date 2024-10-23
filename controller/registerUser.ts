import { Response, Request } from "express"
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/userModel";
import jwt from 'jsonwebtoken';
const registerUser = async (req: Request, res: Response): Promise<any> => {

    try {
        const { username, email, password } = req.body;

        const findUser = await User.findOne(
            { email }
        )
        console.log(findUser , "my find user")
        if ( findUser ) {
            
            const findRes = new ApiResponse(409, findUser, "user with this email is already exist")
            return res.status(409).json(
                findRes
            )
            
        }
        const createdUser = await User.create({
            username,
            email,
            password
        })
        const userId:any  = createdUser._id?.toString()
        console.log(userId , "my userId")
        const token = jwt.sign(userId, 'secret')
        const apiResponse = new ApiResponse(200, {
            data: token
        },
            "user created successfully")
        return res.status(200).json({
            message: apiResponse
        })

    } catch (error) {
        console.log(error)
        throw new ApiError(404, "error in post")
    }

}

export { registerUser };