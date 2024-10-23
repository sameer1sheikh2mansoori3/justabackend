import { Router } from "express";
import { registerUser } from "../controller/registerUser";
import { loginUser } from "../controller/loginUser";
const router = Router();

router.route('/register').post(registerUser)
router.post('/login' , loginUser)
export default router;