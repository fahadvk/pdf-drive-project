import { Schema, model, ObjectId } from 'mongoose';

const FileSchema = new Schema(
  {
    fileName: String,
    filePath: String,
    UserId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    PublicId: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const FileModel = model('Files', FileSchema);

export const createFile = async (data) => {
  try {
    const response = await FileModel.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFilesbyUserId = async (id) => {
  try {
    console.log(id);
    return await FileModel.find({
      $and: [{ UserId: id }, { isDeleted: false }],
    });
  } catch (error) {
    return undefined;
  }
};

export const deleteFilebyId = async (id) => {
  try {
    return await FileModel.findOneAndUpdate(
      { _id: id },
      {
        isDeleted: true,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const search = async (key, id) => {
  return await FileModel.find({
    $and: [
      {
        fileName: { $regex: new RegExp(key), $options: 'si' },
      },
      {
        UserId: id,
      },
      {
        isDeleted: false,
      },
    ],
  });
};

export const AllSearch = async (key) => {
  return await FileModel.find({
    fileName: { $regex: new RegExp(key), $options: 'si' },
  });
};
