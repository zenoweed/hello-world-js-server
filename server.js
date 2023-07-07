// loading express in server.js
const express = require('express');
const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format')
const app = express();
// require('dotenv').config();


const port = 3001;
 
// create application/json parser
app.use(express.json());
app.use(express.urlencoded());

const { combine, timestamp, printf, align } = winston.format;

// const logger = winston.createLogger({
//   format: ecsFormat(), 
//   transports: [
//     new winston.transports.Console()
//   ]
// })

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

app.get('/brian', (req, res) => {
  // let i = 0;
  // while (i < 1000) {
  //   logger.info('Info message');
  //   logger.error('Error message');
  //   logger.warn('Warning message');
  //   i++;
  // }
  logger.info('Info message');
  logger.error('Error message');
  logger.warn('Warning message');
  res.send("Hello World main new");
});

app.get('/brian/health', (req, res) => {
  res.send("Hello1 World is Healthy 22355 " + process.env.spintly_secret);
});

app.post('/brian/sworks-service-for-test',  (req, res) => {
  let reqBody = JSON.parse(JSON.stringify(req.body));
  logger.info(reqBody);
  // logger.info(req.path);
  res.send("Success");
  console.log(reqBody);
});

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});
