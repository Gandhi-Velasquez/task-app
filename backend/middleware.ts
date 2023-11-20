import { Express, Request, Response, NextFunction } from 'express-serve-static-core';
import cors from 'cors';
import { Firestore } from '@google-cloud/firestore';

const IS_TASK_HANDLER = process.env.TASK_MANAGER_APP_HANDLER || 'false';
const IS_TASK_DISPATCH_DIRECT = process.env.TASK_MANAGER_APP_DIRECT || 'false';

function configure(api: Express, dbInstance: Firestore) {
  api.use(cors({ origin: true }));

  api.use((req: Request, res: Response, next: NextFunction) => {
    cacheControl(req, res, next);
  });

  api.use(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await authorization(dbInstance, req, res, next);
      } catch (error) {
        next(error);
      }
    }
  );
}

async function authorization(
  dbInstance: Firestore,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  let ok = false;
  req.currentUser = null;
  const db = dbInstance;
  req.topdb = db;
  req.db = db;
  let unauthorized = true;
  let authorization = req.headers.authorization;
  if (authorization) {
    try {
      ok = true;
      unauthorized = false;
    } catch (e) {
      console.error(e);
    }
  } else if (IS_TASK_DISPATCH_DIRECT || IS_TASK_HANDLER || isNoAuth(req)) {
    ok = true;
    unauthorized = false;
  }
  if (ok) {
    next();
    return;
  }
  if (unauthorized) {
    console.log(
      `Sending 404 for ${req.url}, authorization=${Boolean(authorization)}`
    );
    res.status(401).send('requires authorization');
  }
}

function isNoAuth(req: Request) {
  if (req.path === '/api/authorization') return true;
  return false;
}

function cacheControl(req: Request, res: Response, next: NextFunction) {
  let c = res.getHeader('Cache-Control');
  if (!c) {
    if (
      req.method === 'GET' ||
      req.method === 'HEAD' ||
      req.method === 'OPTIONS'
    ) {
      res.set('Cache-Control', 'private, max-age=0, must-revalidate');
    } else {
      res.set('Cache-Control', 'no-store');
    }
  }
  next();
}

export { configure };
