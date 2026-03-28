import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Health check endpoint for GCP Load Balancer
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
  });

  // Example API endpoint for Medical Tourism services
  app.get('/api/services', (req, res) => {
    res.json([
      { id: 'cardiology', name: 'Cardiology', description: 'Advanced heart care and surgery.' },
      { id: 'orthopedics', name: 'Orthopedics', description: 'Joint replacement and bone health.' },
      { id: 'neurology', name: 'Neurology', description: 'Comprehensive brain and spine treatments.' },
      { id: 'oncology', name: 'Oncology', description: 'State-of-the-art cancer treatments.' }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the React app build directory
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
