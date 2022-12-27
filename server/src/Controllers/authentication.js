import bcrypt from 'bcrypt';
import validator from 'validator';
import Jwt from 'jsonwebtoken';
import { createUser, findUser } from '../Models/UserModel.js';

// hashing password
async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const Salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, Salt);
    return hash;
  } catch (error) {
    return undefined;
  }
}
// comparing  passwords  with hashed
export const comparePass = async (password, comparingpass) => {
  try {
    const valid = await bcrypt.compare(comparingpass, password);
    if (valid) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

const signToken = (id, email) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = Jwt.sign({ id, email }, SECRET_KEY, {
    expiresIn: process.env.Jwt_Expiresin,
  });
  return token;
};
export const registerUser = async (req, res) => {
  const { Name, email, Password, confirmPassword, Mobile } = req.body.data;
  const passMatch = validator.equals(Password, confirmPassword);
  if (passMatch) {
    const hashedPassword = await hashPassword(Password);
    try {
      const response = await createUser({
        Name,
        email,
        Password: hashedPassword,
        Mobile,
      });
      const token = signToken(response._id, response.email);
      res.status(201).json({
        token,
        userId: response._id,
        email: response.email,
        Name: response.Name,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export const doLogin = async (req, res) => {
  const user = await findUser(req.body.email);
console.log(user);
  if (!user) return res.status(401).send('user not found');
  const result = await comparePass(user.Password, req.body.password);
  if (result) {
    const token = signToken(user._id, user.email);
    if (user.isAdmin) {
      return res
        .status(200)
        .json({ token, id: user._id, isAdmin: true, Name: user.Name });
    }
    res
      .status(200)
      .json({ token, userId: user._id, Name: user.Name, email: user.email });
  } else {
    res.status(401).send('wrong Password');
  }
};
export const sendVerify = async (req, res) => {
  const user = await findUser(req.user.email);
  if (!user) return res.send(401);
  res.status(200).json({ userId: user._id, Name: user.Name });
};
