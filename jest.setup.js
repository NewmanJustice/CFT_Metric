// jest.setup.js

// Polyfill TextEncoder for Node.js tests
if (typeof global !== 'undefined' && typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}