import multer from 'multer';
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, Date.now().toString() + file.originalname);
  },
});
export const upload = multer({
  storage: filestorage,
  //   dest: 'public/files',
});
