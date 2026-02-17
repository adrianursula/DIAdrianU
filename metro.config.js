// Metro Bundler Config for Expo Router
// This ensures proper module resolution

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
