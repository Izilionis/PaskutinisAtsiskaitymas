import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
});

export async function validateUser(req, res, next) {
  const {error} = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({message: error.message});
    return;
  }

  next();
}

export default validateUser;
