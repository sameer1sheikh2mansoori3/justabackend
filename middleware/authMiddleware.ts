import { RequestHandler, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the CustomReq interface if you need to extend the request object
interface CustomReq extends Request {
  userId?: any;
  cookies: { token: any };
}

export const verifyJWT: RequestHandler | any = (req: CustomReq, res: Response, next: NextFunction): void => {
  const token = req.cookies.token
  console.log(token , "this is my token")
  
  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    return; // Explicitly return to ensure the function doesn't continue
  }

  try {
    const decoded : any = jwt.verify(token, 'secret') // Cast to your JWT payload type

    if (!decoded) {
      res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
      return; // Explicitly return to avoid execution continuing
    }

    console.log(decoded , "this is our decoded")
    req.userId = decoded// Assuming JWT contains a userId

    next(); // Call next() to proceed to the next middleware
  } catch (error) {
    console.error("Error in verifyToken: ", error);
    res.status(500).json({ success: false, message: "Server error" });
    return; // Ensure the function returns after sending a response
  }
};
