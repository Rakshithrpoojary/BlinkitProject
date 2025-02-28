import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECREAT,
});

export const uploadResult = async (filepath) => {
  try {
    const fileurl = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    return fileurl;
  } catch (error) {
    fs.unlinkSync(filepath);
    return null;
  }
};
