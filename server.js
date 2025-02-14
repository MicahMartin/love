import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 80; // You may adjust to 3000 or your preferred port

// Use fileURLToPath to get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log file path
const logFilePath = path.join(__dirname, 'access.log');

// Middleware to log IP, URL, and User-Agent
app.use((req, res, next) => {
  // Retrieve the IP address from the request
  let ip = req.ip || req.connection.remoteAddress;

  // Check if the IP is IPv6-mapped and strip out the "::ffff:" part to get the IPv4 address
  if (ip.includes('::ffff:')) {
    ip = ip.split('::ffff:')[1]; // Extract the IPv4 address from an IPv6-mapped address
  } else if (ip.startsWith('::')) {
    // Handle pure IPv6 addresses if needed
    ip = 'IPv6';
  }

  const url = req.originalUrl;
  const userAgent = req.get('User-Agent');

  // Log to the console
  console.log(`[${new Date().toISOString()}] ${ip} - ${userAgent} - ${url}`);

  // Log to the file
  const logMessage = `[${new Date().toISOString()}] ${ip} - ${userAgent} - ${url}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file', err);
    }
  });

  // Continue to the next middleware
  next();
});

// Serve static files from the React app's build directory
const buildDirectory = path.join(__dirname, 'dist');
app.use(express.static(buildDirectory));

// All other routes should serve the index.html (this is for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildDirectory, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
