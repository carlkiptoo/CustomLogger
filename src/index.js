const {ColoredLogger} = require('./ColoredLogger');

function createLogger(options = {}) {
    return new ColoredLogger(options);
}

module.exports = {
    ColoredLogger,
    createLogger
}