import {User, validateUser} from "../models/User.js";
// import validateUser from "../middleware/validateUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerNewUser(req, res) {
  const {error} = validateUser(req.body);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const {username, password} = req.body;

  const existingUsername = await User.find({
    username: username,
  });
  if (existingUsername.length > 0) {
    res.status(400).json({message: "Failed to register"});
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({error: "An error occurred while saving the user"});
  }
}

export async function loginUser(req, res) {
  const {username, password} = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({message: "Username and password are required"});
  }

  const user = await User.findOne({username});

  if (!user) {
    return res.status(404).json({error: "User not found"});
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({id: user._id, username: user.username}, secretKey, {
      expiresIn: "1h",
    });

    res.json({token});
  } else {
    res.status(401).json({message: "Password incorrect"});
  }
}

export async function getUsers(req, res) {
  const users = await User.find();

  res.json(users);
}
