import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 80;

// Define log file path
const logFilePath = path.join(__dirname, 'access.log');

// Middleware to log IP, URL, and User-Agent
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
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

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
