import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

const ModelClass = mongoose.model('user', UserSchema);

export default ModelClass;
