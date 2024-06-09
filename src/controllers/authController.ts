import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import Session, { ISession } from "../models/Session";
import { IGetUserAuthInfoRequest } from "../types/express";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/config";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(JWT_EXPIRATION, 10));

    const session = new Session({
      userId: user._id,
      token,
      expiresAt,
    });

    await session.save();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const authenticate = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const session = await Session.findOne({
      userId: decoded.userId,
      token,
    });

    if (!session) {
      return res.status(401).json({ msg: "Invalid session" });
    }
    req.userId = session.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// New controller function to get user profile
export const getProfile = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};