const { createLogger, loggerPresets, debug, info, warn, error, success } = require('../src/index');

/**
 * Demo script showcasing ColoredLogger features
 */
function runDemo() {
  console.log('=== ColoredLogger Demo ===\n');

  // Basic usage with default logger
  console.log('1. Basic Usage:');
  const logger = createLogger();
  
  logger.info().message('Application started successfully');
  logger.warn().message('This is a warning message');
  logger.error().message('An error occurred');
  logger.debug().message('Debug information');
  logger.success().message('Operation completed successfully');
  
  console.log('\n2. Builder Pattern Examples:');
  
  // Advanced builder usage
  logger.info()
    .withPrefix('API')
    .bold()
    .message('Server listening on port 3000');
  
  logger.warn()
    .withPrefix('DATABASE')
    .withSuffix('SLOW_QUERY')
    .message('Query took 2.5s to complete');
  
  logger.error()
    .withPrefix('AUTH')
    .withMetadata({ userId: 123, ip: '192.168.1.1' })
    .message('Failed login attempt');
  
  logger.debug()
    .withIndent(2)
    .dim()
    .message('Nested debug information');
  
  console.log('\n3. Object/Array Logging:');
  
  logger.info()
    .withPrefix('DATA')
    .object({ name: 'John', age: 30, city: 'New York' }, 'User Info');
  
  logger.debug()
    .array([1, 2, 3, 'test', { nested: true }], 'Mixed Array');

  // Table logging
  const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'moderator' }
  ];

  logger.info()
    .withPrefix('USERS')
    .table(users, 'User List');
  
  console.log('\n4. Theme Examples:');
  
  const darkLogger = createLogger({ theme: 'dark' });
  darkLogger.info().message('Using dark theme');
  darkLogger.warn().message('Dark theme warning');
  darkLogger.error().message('Dark theme error');
  
  console.log('\n5. Logger Presets:');
  
  const devLogger = loggerPresets.development();
  devLogger.info().withPrefix('DEV').message('Development environment');
  
  const prodLogger = loggerPresets.production();
  prodLogger.info().withPrefix('PROD').message('Production environment (no colors)');
  
//   const testLogger = loggerPresets.testing();
//   testLogger.success().withPrefix('TEST').message('Test passed (no timestamp)');
  
  console.log('\n6. Custom Configuration:');
  
  const customLogger = createLogger({
    showTimestamp: false,
    theme: 'dark'
  });
  
  customLogger.success()
    .withPrefix('CUSTOM')
    .message('Custom configuration example');

  // Add custom theme
  customLogger.addTheme('rainbow', {
    debug: { color: '\x1b[35m', name: 'DEBUG' },    // Magenta
    info: { color: '\x1b[36m', name: 'INFO' },      // Cyan
    warn: { color: '\x1b[33m', name: 'WARN' },      // Yellow
    error: { color: '\x1b[31m', name: 'ERROR' },    // Red
    success: { color: '\x1b[32m', name: 'SUCCESS' }, // Green
    timestamp: '\x1b[90m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m'
  });

  customLogger.configure({ theme: 'rainbow' });
  customLogger.info().withPrefix('RAINBOW').message('Custom rainbow theme');

  console.log('\n7. Convenience Functions:');
  
  // Using exported convenience functions
  debug('Direct debug call');
  info('Direct info call');
  warn('Direct warning call');
  error('Direct error call');
  success('Direct success call');

  console.log('\n8. Advanced Formatting:');

  logger.info()
    .withPrefix('SYSTEM')
    .withSuffix('STARTUP')
    .withMetadata({ version: '1.0.0', env: 'development' })
    .bold()
    .message('System initialization complete');

  logger.warn()
    .withIndent(1)
    .withPrefix('CACHE')
    .dim()
    .message('Cache miss for key: user_123');

  logger.error()
    .withIndent(2)
    .withPrefix('DATABASE')
    .withMetadata({ query: 'SELECT * FROM users', duration: '5000ms' })
    .message('Query timeout exceeded');

  console.log('\n9. Error Handling:');

  try {
    logger.createBuilder('invalid_level').message('This should fail');
  } catch (err) {
    logger.error()
      .withPrefix('DEMO')
      .message(`Caught expected error: ${err.message}`);
  }

  console.log('\n10. Chaining Multiple Operations:');

  // Example of complex logging scenario
  const apiLogger = createLogger({ theme: 'dark' });
  
  apiLogger.info()
    .withPrefix('API')
    .withSuffix('REQUEST')
    .message('Incoming request');

  apiLogger.debug()
    .withPrefix('API')
    .withIndent(1)
    .withMetadata({ method: 'POST', path: '/users', ip: '192.168.1.100' })
    .dim()
    .message('Request details');

  apiLogger.success()
    .withPrefix('API')
    .withSuffix('RESPONSE')
    .withMetadata({ status: 200, duration: '150ms' })
    .message('Request processed successfully');

  console.log('\n=== Demo Complete ===');
}

// Run the demo
if (require.main === module) {
  runDemo();
}

module.exports = { runDemo };