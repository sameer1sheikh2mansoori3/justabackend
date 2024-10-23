import { IProduct, Product } from "../models/productModel"
import { Request , Response , NextFunction } from "express"
import { ApiResponse } from "../utils/ApiResponse"
import { ApiError } from "../utils/ApiError"
import { IUser, User } from "../models/userModel";
interface CustomRequest extends Request {
    token?: string;
    user?:IUser  // Optional token property
}
export const getProducts = async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const user = req.user;
        const useremail = user?.email;

        if (!user) {
            throw new ApiError(401, 'User not authenticated');
        }

        // Populate productArray to get full product details instead of just IDs
        const populatedUser = await User.findOne({ email: useremail }).populate('productArray'); // Assuming productArray is an array of product IDs

        const apiResponse = new ApiResponse(200, populatedUser?.productArray, "Products fetched successfully");
        return res.status(200).json(apiResponse);
    } catch (error: any) {
        console.log(error.message);
        throw new ApiError(400, 'Error while fetching products');
    }
};
