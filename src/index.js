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
    }),

    silent: (options = {}) => createLogger({
        outputStream: {
            log: () => {},
            error: () => {}
        },
        ...options
    })
};

const defaultLogger = createLogger();

module.exports = {
    ColoredLogger,
    LogBuilder,
    createLogger,
    loggerPresets,
    defaultLogger,

    debug: defaultLogger.debug.bind(defaultLogger),
    info: defaultLogger.info.bind(defaultLogger),
    warn: defaultLogger.warn.bind(defaultLogger),
    error: defaultLogger.error.bind(defaultLogger),
    success: defaultLogger.success.bind(defaultLogger),
};

if (typeof window !== 'undefined') {
    window.ColoredLogger = module.exports;
}