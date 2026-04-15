import { cpSync, mkdirSync, rmSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const frontendBuild = path.join(__dirname, 'frontend/TeamNote mockup/build');
const publicDir = path.join(__dirname, 'public');

try {
  rmSync(publicDir, { recursive: true, force: true });
} catch (e) {}
mkdirSync(publicDir, { recursive: true });
cpSync(frontendBuild, publicDir, { recursive: true });
const indexHtml = path.join(__dirname, 'frontend/TeamNote mockup/index.html');
cpSync(indexHtml, path.join(publicDir, 'index.html'));
console.log('Frontend build copied to public/');

