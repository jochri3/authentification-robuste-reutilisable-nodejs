// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Define our model
const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

// On save Hook, encrypt password
// userSchema.pre('save', (next) => {
//   //   const user = this;

//   const salt = bcrypt.genSaltSync(10);
//   const hashed = bcrypt.hashSync(this.password, salt);
//   this.password = hashed;
//   next();
// });

UserSchema.methods.comparePassword = async (candidatePassword, callback) => {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  if (isMatch) {
    callback(null, isMatch);
  }
};

// Create the model class
const ModelClass = mongoose.model('user', UserSchema);

// Export the mode
// export default ModelClass;
module.exports = ModelClass;
