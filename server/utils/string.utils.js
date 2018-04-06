import mongoose from 'mongoose';

export const trim = value => value ? value.trim().split(' ').filter(x => x !== '').join(' ') : value;

export const isObjectId = value => {
  return mongoose.Types.ObjectId.isValid(value)
      ? value
      : mongoose.mongo.ObjectId("000000000000000000000000")
};
