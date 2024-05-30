import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!);
};

export default generateToken;
