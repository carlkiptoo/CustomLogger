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

}