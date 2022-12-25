import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './Routes/userRoutes.js';
import adminRoute from './Routes/adminRoute.js'

dotenv.config();
const app = express();
const port = process.env.Port || 3000;
const Url = process.env.Mongo_Url;
// app.use(fileupload({useTempFiles:true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use(cors({ credentials: true, origin: process.env.Origin_Url }));
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use('/user', userRoute);
app.use('/admin',adminRoute)
mongoose
  .connect(Url)
  .then((data) => {
    app.listen(port, () => {
      console.log(`server listening to ${port} `);
    });
  })
  .catch((e) => console.log(e));
