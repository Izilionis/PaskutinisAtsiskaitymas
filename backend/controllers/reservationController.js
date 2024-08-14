import Reservation from "../models/Reservations.js";

export async function getReservations(req, res) {
  const {sortBy} = req.query;
  try {
    const validSortFields = ["fullname", "age"];
    let reservations;

    if (sortBy && validSortFields.includes(sortBy.toLowerCase())) {
      const sortField = sortBy.toLowerCase();
      const sortCriteria = {};
      sortCriteria[sortField] = 1;

      reservations = await Reservation.find({}, {__v: 0})
        .collation({locale: "en", strength: 2})
        .sort(sortCriteria);
    } else {
      reservations = await Reservation.find({}, {__v: 0});
    }

    res.json(reservations);
  } catch (error) {
    res.status(500).json({error: "Something went wrong"});
  }
}

export async function createNewReservation(req, res) {
  const {fullname, email, age} = req.body;

  try {
    const existingEmail = await Reservation.find({
      email: email,
    });
    if (existingEmail.length > 0) {
      res.status(400).json({message: "This email is already registered"});
      return;
    }

    const newReservation = new Reservation({
      fullname,
      email,
      age,
    });

    await newReservation.save();

    res.json(newReservation);
  } catch (error) {
    res.status(500).json({error: "Something went wrong"});
  }
}

export async function updateReservation(req, res) {
  const {id} = req.params;
  const {fullname, email, age} = req.body;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      res.status(404).json({message: "Reservation does not exist"});
      return;
    }

    reservation.fullname = fullname;
    reservation.email = email;
    reservation.age = age;

    await reservation.save();

    res.json(reservation);
  } catch (error) {
    res.status(500).json({error: "Something went wrong"});
  }
}

export async function deleteReservation(req, res) {
  const {id} = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      res.status(404).json({message: "Reservation does not exist"});
      return;
    }

    res.json(deletedReservation);
  } catch (error) {
    res.status(500).json({error: "Something went wrong"});
  }
}
