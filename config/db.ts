import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '.env') });

import mongoose from 'mongoose';
// import { loadModels } from '..';
// const { loadModels } = require('../app/models/index');
interface CustomConnectOptions extends mongoose.ConnectOptions {
  useUnifiedTopology: boolean;
}

export const DB_URL = process.env.MONGO_DB_URL as string;
export default function initMongo() {
  const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.set('strictQuery', false);
    mongoose
      .connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as CustomConnectOptions)
      .then(() => {
        console.log('***************************');
        console.log('* Starting Server');
        console.log(`* Port: ${process.env.PORT || 3000}`);
        console.log(`* NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`* Database: MongoDB`);
      })
      .catch((err: any) => console.log(err));
  };

  connect();
  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
  // loadModels();
};
