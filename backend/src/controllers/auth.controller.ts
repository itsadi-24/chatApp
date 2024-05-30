import { Request, Response } from 'express';
import prisma from '../db/prisma.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    // to check from our database that user already exists or not
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //giving users profilepic
    const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username={username}`;
    const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username={username}`;

    //the below line is used for creating new user in the db
    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyprofilePic : girlprofilePic,
      },
    });

    if (newUser) {
      //generate token
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    console.error('Error in signup controller', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
