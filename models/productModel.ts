import mongoose from "mongoose";

interface IProduct {
    
    productName: string;
    quantity: number;
    productNumber: number;
}


const productSchema = new mongoose.Schema<IProduct>(
    {
        productName:{
            type:String
        },
         productNumber:{
            type:Number
         },
         quantity:{
            type:Number
         }
    }

)

const Product  =mongoose.model<IProduct>('Product', productSchema);

export { Product  , IProduct };