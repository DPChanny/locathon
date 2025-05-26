const path = require('path');

export default {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
    },
  },
  root: true,
  extends: '@react-native',
};
