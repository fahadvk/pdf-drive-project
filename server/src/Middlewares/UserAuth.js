import { verify } from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';
import { findUser } from '../Models/UserModel.js';

export const userAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (!err) {
          const { id, email } = decoded;
        
          if (isValidObjectId(id)) {
            req.user = { id, email };
            next();
          }
        } else {
          res.status(401).send('authentication failed');
        }
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  } else {
    res.status(401).send('authentication failed');
  }
};
