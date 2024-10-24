import { Router } from "express";
import { registerUser } from "../controller/registerUser";
import { loginUser } from "../controller/loginUser";
import { Logout } from "../controller/LogoutController";
import { verifyJWT } from "../middleware/authMiddleware";
import { checkAuth } from "../controller/CheckAuth";
const router = Router();

router.route('/register').post(registerUser)
router.post('/login' , loginUser)
router.post('/logout', verifyJWT , Logout)
router.get("/check-auth", verifyJWT, checkAuth);
export default router;