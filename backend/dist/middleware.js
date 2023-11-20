"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const cors_1 = __importDefault(require("cors"));
const env = process.env.NODE_ENV || 'development';
const IS_TASK_HANDLER = process.env.TASK_MANAGER_APP_HANDLER || 'false';
const IS_TASK_DISPATCH_DIRECT = process.env.TASK_MANAGER_APP_DIRECT || 'false';
function configure(api, dbInstance) {
    api.use((0, cors_1.default)({ origin: true }));
    api.use((req, res, next) => {
        cacheControl(req, res, next);
    });
    api.use(async (req, res, next) => {
        try {
            await authorization(dbInstance, req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.configure = configure;
async function authorization(dbInstance, req, res, next) {
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
        let token = authorization.substring('Bearer '.length);
        try {
            ok = true;
            unauthorized = false;
        }
        catch (e) {
            console.error(e);
        }
    }
    else if (IS_TASK_DISPATCH_DIRECT || IS_TASK_HANDLER || isNoAuth(req)) {
        ok = true;
        unauthorized = false;
    }
    if (ok) {
        next();
        return;
    }
    if (unauthorized) {
        console.log(`Sending 404 for ${req.url}, authorization=${Boolean(authorization)}`);
        res.status(401).send('requires authorization');
    }
}
function isNoAuth(req) {
    if (req.path === '/api/authorization')
        return true;
    return false;
}
function cacheControl(req, res, next) {
    let c = res.getHeader('Cache-Control');
    if (!c) {
        if (req.method === 'GET' ||
            req.method === 'HEAD' ||
            req.method === 'OPTIONS') {
            res.set('Cache-Control', 'private, max-age=0, must-revalidate');
        }
        else {
            res.set('Cache-Control', 'no-store');
        }
    }
    next();
}
