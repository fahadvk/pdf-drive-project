import { v2 } from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();

v2.config({
  cloud_name: process.env.CloudinaryCloudName,
  api_key: process.env.CloudinaryApikey,
  api_secret: process.env.CloudinaryApiSecret,
});
export default v2;
