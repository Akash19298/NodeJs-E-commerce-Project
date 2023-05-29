const fs = require('fs');

let errorLogger = (err, req, res, next) => {
    fs.appendFileSync('ErrorLogger.txt', new Date() + " - " + err.stack + "/n", (error) => {
        if (error) {
            console.log("Error Logging Failed")
        } else {
            if (err.status) {
                return res.status(err.status);
            } else {
                res.status(500);
                res.json({ "message": err.message });
                next();
            }
        }
    })
}

module.exports = errorLogger;