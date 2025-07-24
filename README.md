# CustomLogger

A lightweight, customizable, and colorful logging utility for Node.js applications.  
Provides consistent, styled logging using a builder pattern, perfect for creating readable and structured logs in CLI tools and backend services.

## Features

- **LogBuilder pattern** for constructing rich messages
- **Colored output** for easy terminal readability  
- **Lightweight** — no unnecessary dependencies
- **Modular** and easy to extend

## Installation

```bash
npm install custom-logger
```

If you're using it locally for now, just clone the repo and require/import from the `src/` folder.

## Usage

```javascript
// examples/demo.js
import logger from '../src/index.js';

const log = logger.info().message('Starting server...').tag('init').build();
console.log(log);

logger.warn().message('This is a warning').tag('auth').build();
logger.error().message('Something went wrong').tag('db').build();
```

You can chain multiple log configurations:

```javascript
logger
  .debug()
  .message('Debugging cache layer')
  .tag('cache')
  .timestamp()
  .build();
```

## Project Structure

```
colored-logger/
├── src/
│   ├── ColoredLogger.js      # Main logger logic
│   ├── LogBuilder.js         # Fluent builder for log messages
│   └── index.js              # Entry point
├── examples/
│   └── demo.js               # Demo usage of the logger
├── package.json
├── README.md
└── .gitignore
```

## Running Examples

```bash
node examples/demo.js
```

Make sure your terminal supports ANSI colors.

## Contributing

Feel free to open issues, suggest improvements, or submit PRs

## License

MIT License.

---
