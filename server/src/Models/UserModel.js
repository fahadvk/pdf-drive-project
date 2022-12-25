import { model, Model, Schema } from 'mongoose';
import validator from 'validator';
const UserSchema = new Schema({
  Name: {
    type: String,
    requred: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'value must be email'],
    unique: [true, 'this email is already in use'],
  },
  Password: {
    type: String,
    required: true,
    select: false,
  },
  Mobile: {
    type: Number,
    required: true,
  },
  isAdmin: {
    default: false,
    type: Boolean,
    select: false,
  },
});

const UserModel = model('User', UserSchema);

export const createUser = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    if (error.code == 11000) {
      throw Error('this email already in use');
    }
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors = error.errors[key].message;
      });
      throw Error(errors);
    }
  }
};

export const findUser = async (email) => {
  return await UserModel.findOne({ email: email }).select('+Password +isAdmin');
};
