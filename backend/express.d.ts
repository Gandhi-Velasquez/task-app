import { Request } from 'express';
import { Firestore } from '@google-cloud/firestore';

declare global {
  namespace Express {
    interface Request {
      currentUser: any;
      topdb: Firestore;
      db: Firestore;
    }
  }
}
