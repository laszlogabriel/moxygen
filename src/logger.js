var winston = require('winston');

var logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'moxygen.log' }),
  ],
});

module.exports = logger;
