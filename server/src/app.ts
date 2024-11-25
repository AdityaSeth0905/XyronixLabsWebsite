import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config';
import helmet from 'helmet';
const app = express();

app.use(helmet());

// Cors Configuration
const CORS_ORIGINS = [
  'http://localhost:3000',
  process.env.CORS_ORIGIN,
  process.env.RENDER_EXTERNAL_URL,
  // Your Render-generated URL
  `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`
].filter((origin): origin is string => origin !== undefined);

app.use(cors({
  origin: CORS_ORIGINS.length > 0 ? CORS_ORIGINS : '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React app
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    environment: config.environment 
  });
});

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

export default app;