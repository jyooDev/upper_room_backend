import admin from '../firebaseAdmin';
import { jwtDecode } from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) throw 'NO TOKEN';
  // Bearer <token value>
  const idToken = header.split(' ')[1];

  const payload = jwtDecode(idToken);
  console.log(payload.aud, payload.iss, payload.exp);

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log('decoded: ', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('error =', error);
    return res.status(401).send('UNAUTHORIZED');
  }
};

export default verifyToken;
