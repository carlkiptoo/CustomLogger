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

        const color = finalOptions.customColor || levelConfig.color;
        let levelText = levelConfig.name;

        if (finalOptions.bold) levelText = `${theme.bold}${levelText}`;
        if (finalOptions.dim) levelText = `${theme.dim}${levelText}`;

        const coloredLevel = this.logger.applyColor(levelText, color);
        parts.push(`[${coloredLevel}]`);

        if (finalOptions.prefix) {
            parts.push(`${finalOptions.prefix} `);
        }

        let mainMessage = text;
        if (finalOptions.bold && this.logger.config.colorEnabled) {
            mainMessage = `${theme.bold}${mainMessage}${theme.reset}`;
        }
        if (finalOptions.dim && this.logger.config.colorEnabled) {
            mainMessage = `${theme.dim}${mainMessage}${theme.reset}`;
        }

        parts.push(mainMessage);

        if (finalOptions.prefix) {
            parts.push(` ${finalOptions.suffix}`);
        }

        if (finalOptions.metadata) {
            const metadataString = typeof finalOptions.metadata === 'object' ? JSON.stringify(finalOptions.metadata) : finalOptions.metadata;
            parts.push(`${this.logger.applyColor(metadataString, theme.dim)}`);
        }

        const indent = ' '.repeat(finalOptions.indent);
        const fullMessage = indent + parts.join(' ');

        const outputMethod = this.level === 'error' ? 'error' : 'log';
        this.logger.config.outputStream[outputMethod](fullMessage);

        return this;

    }

    object(obj, label = null) {
        const objStr = JSON.stringify(obj, null, 2);
        const message = label ? `${label}:\n${objStr}` : objStr;
        return this.message(message);
    }

    array(arr, label = null) {
        const arrStr = arr.map((item, index) => `${index}: ${JSON.stringify(item)}`).join('\n');
        const message = label ? `${label}:\n${arrStr}` : arrStr;
        return this.message(message);
    }

    table(data, label = null) {
        if (!Array.isArray(data) || data.length === 0) {
            return this.message(label ? `${label}: (empty)` : '(empty)');
        }

        const headers = Object.keys(data[0]);
        const rows = data.map(item => headers.map(header => String(item[header] || '')));

        const widths = headers.map((header, i) => 
            Math.max(header.length, ...rows.map(row => row[i].length))
        );

        const headerRow = headers.map((header, i) =>  header.padEnd(widths[i])).join(' | ');
        const separator = widths.map(width => '-'.repeat(width)).join('-|-');
        const dataRows = rows.map(row =>
            row.map((cell, i) => cell.padEnd(widths[i])).join(' | ')
        );

        const table = [headerRow, separator, ...dataRows].join('\n');
        const message = label ? `${label}:\n${table}` : table;
        return this.message(message);

    }



}

module.exports = LogBuilder;