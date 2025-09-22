const express = require('express');
const path = require('path');
const app = express();

// Serve static files from Vite's build output
app.use(express.static(path.join(__dirname, 'dist')));

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));