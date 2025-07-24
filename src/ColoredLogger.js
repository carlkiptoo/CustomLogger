const LogBuilder = require('./LogBuilder');

class ColoredLogger {
    constructor(options = {}) {
        this.config = {
            colorEnabled: options.colorEnabled ?? this.detectColorSupport(),
            timestampFormat: options.timestampFormat ?? 'HH:mm:ss',
            showTimestamp: options.showTimestamp ?? true,
            outputStream: options.outputStream ?? console,
            theme: options.theme ?? 'default',
            ...options
        };

        
    }
}