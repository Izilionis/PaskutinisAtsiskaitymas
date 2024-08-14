import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

export default mongoose.model("reservation", reservationSchema);
