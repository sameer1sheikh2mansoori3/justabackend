import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import cookieParser from 'cookie-parser'
const app: Express = express();

// Define allowed origins (without the trailing slash)
const allowedOrigins = [
    "http://localhost:5173",  // No trailing slash
      // No trailing slash
    // Add more allowed origins here
];

// CORS middleware should be configured before routes
app.use(cors({
    origin: allowedOrigins,  // Allow specified origins
    credentials: true,       // Allow cookies or HTTP authentication
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
}));

app.use(cookieParser());
// Body parser middleware
app.use(express.json({ limit: "16kb" }));

// Define your routes after CORS middleware
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);

// Example route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('hi there');
});

// Export the app
export { app };
