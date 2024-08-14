import joi from "joi";

const reservationSchema = joi.object({
  fullname: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  age: joi.number().min(12).required(),
});

export async function validateReservationBody(req, res, next) {
  const {error} = reservationSchema.validate(req.body);
  if (error) {
    res.status(400).json({message: error.message});
    return;
  }

  next();
}
