// middleware/logger.js
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../data/logs.txt');

function logger(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error('Failed to write log:', err);
  });

  console.log(log.trim()); // also show in console
  next();
}

module.exports = logger;
