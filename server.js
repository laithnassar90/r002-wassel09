// server.js
import express from 'express';
import { join } from 'path';
const app = express();

// Serve static files from Vite's build output
app.use(express.static(join(__dirname, 'dist')));

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));