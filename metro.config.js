const { getDefaultConfig } = require('expo/metro-config');

// Get the default Expo config (this is what you're using now)
const config = getDefaultConfig(__dirname);

// Only add a small optimization to reduce watcher load
// This safely ignores test/doc folders inside node_modules
config.resolver.blockList = [
  /node_modules\/.*\/test\/.*/,
  /node_modules\/.*\/tests\/.*/,
  /node_modules\/.*\/__tests__\/.*/,
];

module.exports = config;
