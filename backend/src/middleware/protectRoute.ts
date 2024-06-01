import jwt, { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma.js';

interface DecodedToken extends JwtPayload {
  userId: string;
}

//we are adding user property to the Request interface
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorizes - No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        profilePic: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;

    next();
  } catch (error: any) {
    console.error('Error in protectRoute middleware', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export default protectRoute;
