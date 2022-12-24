import express from 'express';
import Cookies from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.Port || 3000;
console.log(process.env.Port);
app.listen(port, () => {
  console.log(`server listening to ${port} `);
});
