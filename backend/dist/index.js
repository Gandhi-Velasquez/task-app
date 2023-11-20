"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middleware = __importStar(require("./middleware"));
const firestore_1 = require("@google-cloud/firestore");
let firebaseApp = null;
const dbInstance = new firestore_1.Firestore();
const env = process.env.NODE_ENV || 'development';
const IS_USER_HANDLER = (process.env.TASK_MANAGER_APP_HANDLER || 'true') === 'true';
if (require.main === module) {
    (async () => {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({ origin: true }));
        const api = (0, express_1.default)();
        api.set('etag', false);
        app.set('etag', false);
        middleware.configure(api, dbInstance);
        api.use('/api', app);
        const port = process.env.PORT || 3000;
        api.listen(port, () => console.log('lonche.app backend [' + env + '] listening on https', port));
    })();
}
