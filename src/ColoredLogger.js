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
        debug: { color: "\x1b[36m", name: "DEBUG" }, // Cyan
        info: { color: "\x1b[32m", name: "INFO" }, // Green
        warn: { color: "\x1b[33m", name: "WARN" }, // Yellow
        error: { color: "\x1b[31m", name: "ERROR" }, // Red
        success: { color: "\x1b[92m", name: "SUCCESS" }, // Bright Green
        timestamp: "\x1b[90m",
        reset: "\x1b[0m",
        bold: "\x1b[1m",
        dim: "\x1b[2m",
      },
      dark: {
        debug: { color: "\x1b[96m", name: "DEBUG" }, // Bright Cyan
        info: { color: "\x1b[94m", name: "INFO" }, // Bright Blue
        warn: { color: "\x1b[93m", name: "WARN" }, // Bright Yellow
        error: { color: "\x1b[91m", name: "ERROR" }, // Bright Red
        success: { color: "\x1b[92m", name: "SUCCESS" }, // Bright Green
        timestamp: "\x1b[37m", // White
        reset: "\x1b[0m",
        bold: "\x1b[1m",
        dim: "\x1b[2m",
      },
    };
  }

  detectColorSupport() {
    if (typeof process !== "undefined" && process.env) {
      return !!(
        process.stdout &&
        process.stdout.isTTY &&
        process.env.TERM !== "dumb" &&
        !process.env.NO_COLOR
      );
    }

    if (typeof window !== "undefined") {
      return true;
    }

    return false;
  }

  getTheme() {
    return this.themes[this.config.theme] || this.themes.default;
  }

  formatTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  applyColor(text, color) {
    if (!this.config.colorEnabled) return text;
    const theme = this.getTheme();
    return `${color}${text}${theme.reset}`;
  }

  createBuilder(level) {
    return new LogBuilder(this, level);
  }

  logDirect(level, message, options = {}) {
    return this.createBuilder(level).message(message, options);
  }

  configure(newConfig) {
    this.config = { ...this.config, ...newConfig };
    return this;
  }

  addTheme(name, theme) {
    this.themes[name] = theme;
    return this;
  }
  debug(message, options = {}) {
    return this.logDirect("debug", message, options);
  }

  info(message, options = {}) {
    return this.logDirect("info", message, options);
  }

  warn(message, options = {}) {
    return this.logDirect("warn", message, options);
  }

  error(message, options = {}) {
    return this.logDirect("error", message, options);
  }

  success(message, options = {}) {
    return this.logDirect("success", message, options);
  }
}
module.exports = ColoredLogger;
