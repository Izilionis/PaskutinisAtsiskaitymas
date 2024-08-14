import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

export {User, validateUser};

// export {User};
