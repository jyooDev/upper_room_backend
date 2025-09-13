import admin from '../firebaseAdmin';
import { jwtDecode } from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

const logger = new Logger('/src/middlewares/verify-token.ts');

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) throw 'NO HEADER';
  // Bearer <token value>
  const idToken = header.split(' ')[1];

  // const payload = jwtDecode(idToken);
  // console.log(payload.aud, payload.iss, payload.exp);

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    logger.debug('Id Token is Valid');
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('error =', error);
    return res.status(401).send('UNAUTHORIZED');
  }
};

export default verifyToken;
