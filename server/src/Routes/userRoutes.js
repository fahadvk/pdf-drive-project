import { Router } from 'express';
import {
  doLogin,
  registerUser,
  sendVerify,
} from '../Controllers/authentication.js';
import {
  DeleteFile,
  getUserFiles,
  searchFile,
  uploadFile,
} from '../Controllers/FileController.js';
import { upload } from '../Middlewares/FileUpload.js';
import { userAuth } from '../Middlewares/UserAuth.js';

const router = Router();
router.post('/register', registerUser);
router.post('/login', doLogin);
router.get('/verify', userAuth, sendVerify);
router.post('/upload', userAuth, upload.single('file'), uploadFile);
router.get('/getFiles', userAuth, getUserFiles);
router.delete('/:id/filedelete', userAuth, DeleteFile);
router.get('/:search/search', userAuth, searchFile);
export default router;
