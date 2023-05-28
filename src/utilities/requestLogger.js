const fs = require('fs');

let requestLogger = (req, res, next) => {
    let logMessage = new Date() + " " + req.method + " " + req.url + "\n";
    fs.appendFileSync('RequestLogger.txt', logMessage, (err) => {
        if (err) return next(err);
    })
    next();
}

module.exports = requestLogger;