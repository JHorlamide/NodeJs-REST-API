import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 320,
    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const payload = {
    user: {
      _id: this._id,
    },
  };

  const token = jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 });
  return token;
};

export const User = mongoose.model("User", userSchema);

export const userValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(3).max(320).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};
