import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Plugin to serve portfolio photos from the portfolio-photos directory
// This avoids copying 9GB of photos into dist during production build
function servePortfolioPhotos() {
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };

  function serveStatic(baseDir) {
    return (req, res, next) => {
      const decodedPath = decodeURIComponent(req.url);
      const filePath = path.join(process.cwd(), 'portfolio-photos', baseDir, decodedPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        fs.createReadStream(filePath).pipe(res);
      } else {
        next();
      }
    };
  }

  return {
    name: 'serve-portfolio-photos',
    configureServer(server) {
      // Thumbnails (800px, fast-loading for grid view)
      server.middlewares.use('/portfolio/thumbs', serveStatic('thumbs'));
      // Full-res originals (for lightbox)
      server.middlewares.use('/portfolio/couples', serveStatic('couples'));
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), servePortfolioPhotos()],
})
