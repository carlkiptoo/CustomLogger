class LogBuilder {
    constructor(logger, level) {
        this.logger = logger;
        this.level = level;
        this.options = {
            prefix: null,
            suffix: null,
            bold: false,
            dim: false,
            customColor: null,
            includeTimestamp: logger.config.includeTimestamp,
            metadata: null,
            indent: 0
        };
    }

    //Adding a prefix to the log

    withPrefix(prefix) {
        this.options.prefix = prefix;
        return this;
    }
    //Adding a suffix to the log
    withSuffix(suffix) {
        this.options.suffix = suffix;
        return this;
    }

    withColor(color) {
        this.options.customColor = color;
        return this;
    }

    bold() {
        this.options.bold = true;
        return this;
    }

    dim() {
        this.options.dim = true;
        return this;
    }

    withoutTimesteamp() {
        this.opttions.includeTimestamp = false;
        return this;
    }

    withTimestamp() {
        this.options.includeTimestamp = true;
        return this;
    }

    withMetadata(metadata) {
        this.options.metadata = metadata;
        return this;
    }

    withIndent(indent) {
        this.options.indent = indent;
        return this;    
    }

    message(text, additionalOptions = {}) {
        const finalOptions = {...this.options, ...additionalOptions};
        const theme = this.logger.getTheme();
        const levelConfig = theme[this.level];

        if (!levelConfig) {
            throw new Error(`Unknown log level: ${this.level}`);
        }

        let parts = [];

        if (finalOptions.includeTimestamp) {
            const timestamp = this.logger.formatTimestamp();
            const coloredTimestamp = this.logger.applyColor(timestamp, theme.timestamp);
            parts.push(`[${coloredTimestamp}]`);
        }


    }

}