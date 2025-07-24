const LogBuilder = require("./LogBuilder");

class ColoredLogger {
  constructor(options = {}) {
    this.config = {
      colorEnabled: options.colorEnabled ?? this.detectColorSupport(),
      timestampFormat: options.timestampFormat ?? "HH:mm:ss",
      showTimestamp: options.showTimestamp ?? true,
      outputStream: options.outputStream ?? console,
      theme: options.theme ?? "default",
      ...options,
    };

    this.themes = {
      default: {
        debug: { color: "cyan", name: "DEBUG" },
        info: { color: "green", name: "INFO" },
        warn: { color: "yellow", name: "WARN" },
        error: { color: "red", name: "ERROR" },
        success: { color: "green", name: "SUCCESS" },
        timestamp: "gray",
        reset: "reset",
        bold: "bold",
        dim: "dim",
      },
      dark: {
        debug: { color: "\x1b[96m", name: "DEBUG" },
        info: { color: "\x1b[94m", name: "INFO" },
        warn: { color: "\x1b[93m", name: "WARN" },
        error: { color: "\x1b[91m", name: "ERROR" },
        success: { color: "\x1b[92m", name: "SUCCESS" },
        timestamp: "\x1b[37m",
        reset: "\x1b[0m",
        bold: "\x1b[1m",
        dim: "\x1b[2m",
      },
    };
  }
}
