import { JwtPayload, verify } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  payload?: string | JwtPayload;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const token = req.headers.authorization || req.cookies.user_token;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = verify(token, JWT_SECRET);

    res.status(200).json({ message: 'OK', payload });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
