// src/index.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import analyticsRoutes from './routes/analytics';
import productsRoutes from './routes/products';
import jwt from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import cors from 'cors';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());

// Middleware to authenticate JWT
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err: jwt.VerifyErrors | null, user: jwt.JwtPayload | string | Buffer | undefined) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      (req as any).user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Use authentication routes
app.use('/auth', authRoutes);

// Protect your routes
app.use('/analytics', authenticateJWT, analyticsRoutes);
app.use('/products', authenticateJWT, productsRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
