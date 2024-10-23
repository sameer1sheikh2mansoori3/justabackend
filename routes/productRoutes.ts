import { Router } from "express";
import {showProduct} from '../controller/showProduct'
import { createProduct } from "../controller/createProduct";
import { verifyJWT } from "../middleware/authMiddleware";
import { getProducts } from "../controller/getProducts";


const router = Router();



router.post('/create', verifyJWT , createProduct)
router.get('/bulk' ,verifyJWT , getProducts )
export default router;