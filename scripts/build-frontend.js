import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.join(__dirname, '..', 'frontend');

console.log('Building frontend from:', frontendDir);

try {
  // Clean old public/build to avoid stale Laravel Vite assets
  const buildDir = path.join(__dirname, '..', 'public', 'build');
  console.log('Cleaning old public/build directory...');
  try {
    rmSync(buildDir, { recursive: true, force: true });
    console.log('Removed old public/build');
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error('Failed to remove public/build:', e.message);
    }
  }

  // Clean old public/assets/index.html if it exists (from Laravel Vite)
  const indexHtml = path.join(__dirname, '..', 'public', 'index.html');
  try {
    rmSync(indexHtml, { force: true });
    console.log('Removed old public/index.html');
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error('Failed to remove public/index.html:', e.message);
    }
  }

  execSync('npm run build', {
    cwd: frontendDir,
    stdio: 'inherit',
  });
  
  console.log('Build completed successfully!');
} catch (err) {
  console.error('Build failed:', err.message);
  process.exit(1);
}
