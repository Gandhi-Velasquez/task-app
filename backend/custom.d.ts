import { Request } from 'express';
import { Firestore } from '@google-cloud/firestore';

declare module 'express-serve-static-core' {
  interface Request {
    currentUser: any;
    topdb: Firestore;
    db: Firestore;
  }
}
