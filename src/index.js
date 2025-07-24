const ColoredLogger = require('./ColoredLogger');
const LogBuilder = require('./LogBuilder');

function createLogger(options ={}) {
    return new ColoredLogger(options);
}

const loggerPresets = {
    development: (options = {}) => createLogger({
        showTimestamp: true,
        theme: 'default',
        colorEnabled: true,
        ...options
    }),

    production: (options = {}) => createLogger({
        showTimestamp: true,
        theme: 'default',
        colorEnabled: false,
        ...options
    })
}