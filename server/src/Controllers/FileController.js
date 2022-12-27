import {
  createFile,
  deleteFilebyId,
  getFilesbyUserId,
  search,
} from '../Models/FileModel.js';
import Cloudinary from '../Utils/cloudinaryConfig.js';

export const uploadFile = async (req, res) => {
  // const file = req.files.file.tempFilePath;
  console.log(req.file, 'fff');
  const { name } = req.body;
  try {
    // const { secure_url, public_id } = await Cloudinary.uploader.upload(file, {
    //   folder: 'pdfs',
    // });
    const { filename } = req.file;
    const response = await createFile({
      fileName: name,
      // filePath: secure_url,
      filePath: filename,
      UserId: req.user.id,
      // PublicId: public_id,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getUserFiles = async (req, res) => {
  const { id } = req.user;
  const response = await getFilesbyUserId(id);
  console.log(response);
  if (response) res.status(200).send(response);
};

export const DeleteFile = async (req, res) => {
  console.log(req.params);
  const response = await deleteFilebyId(req.params.id);
  console.log(response);
  res.status(200).send('deleted');
  // Cloudinary.uploader.destroy(response.PublicId, (err, result) => {
  //   if (!err) res.status(200).send(response);
  //   console.log(err);
  // });
};

export const searchFile = async (req, res) => {
  const response = await search(req.params.search, req.user.id);
  console.log(response);
  return res.status(200).json(response);
};
