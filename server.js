// server.js (ES module version)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Paths
const BUILD_DIR = path.resolve(__dirname, 'build');
const INDEX_HTML = path.join(BUILD_DIR, 'index.html');

// Middleware

// Security headers
app.use(helmet());

// Enable CORS if you plan to call your API from other domains
app.use(cors());

// Logging requests
app.use(morgan('combined'));

// Compress responses for better performance
app.use(compression());

// Parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files with cache control
app.use(
  express.static(BUILD_DIR, {
    maxAge: '30d', // Cache static assets for 30 days
    etag: false,
  })
);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Example API route (you can add more under /api)
app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example API route' });
});

// SPA fallback (must be last)
app.get('/*', (req, res) => {
  res.sendFile(INDEX_HTML, (err) => {
    if (err) {
      console.error('❌ Error serving index.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
