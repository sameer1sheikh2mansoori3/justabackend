import { Response, Request } from "express";
import { IProduct, Product } from "../models/productModel";
import { IUser } from "../models/userModel";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
interface CustomRequest extends Request {
  token?: string;
  user?: IUser; // Optional token property
}

export const createProduct = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const { productName, quantity, productNumber }: IProduct = req.body;
    const token = req.token;
    const user = req.user;
    const product:any  = await Product.create({productName ,  productNumber,quantity})
    user?.productArray.push(
      product._id
    )
    await user?.save()
    const resPonse = new ApiResponse(200, user, "product added successfully");
    return res.status(200).json(resPonse);
  } catch (error) {
    console.error(`error while creating Products ${error}`);
    throw new ApiError(404, "error while creating Product");
  }
};
