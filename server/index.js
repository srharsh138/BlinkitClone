import express from 'express';
import cors from 'cors';
import dotenv from  'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectDB } from './config/connectDB.js';
dotenv.config();
const app=express();
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(helmet({crossOriginEmbedderPolicy:false}));
const PORT=process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});