"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const CORS_ORIGINS = [
    'http://localhost:3000',
    process.env.CORS_ORIGIN,
    process.env.RENDER_EXTERNAL_URL,
    `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`
].filter((origin) => origin !== undefined);
app.use((0, cors_1.default)({
    origin: CORS_ORIGINS.length > 0 ? CORS_ORIGINS : '*',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const clientBuildPath = path_1.default.join(__dirname, '../../client/dist');
app.use(express_1.default.static(clientBuildPath));
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        environment: config_1.config.environment
    });
});
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(clientBuildPath, 'index.html'));
});
exports.default = app;
//# sourceMappingURL=app.js.map