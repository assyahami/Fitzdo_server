import express from 'express';
import appRoutes from './routes';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import rateLimiter from 'express-rate-limit';
dotenv.config({ path: "../config/.env" });
import initMongo from '../../config/db';
import errorHandler from './middleware/errorHandle';


const app = express();

app.set('port', process.env.PORT || 3000);


app.use(logger('dev'));
app.use(express.json({ limit: "500kb" }));
app.use(helmet());
initMongo();
app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const appRatelimiter = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 100,
});

app.use(appRatelimiter);
app.use(appRoutes);
app.use(errorHandler);


const port = app.get('port');

export {
    app,
    port
}