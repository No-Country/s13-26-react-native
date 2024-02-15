module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['@babel/plugin-transform-export-namespace-from', 'react-native-reanimated/plugin'],
    presets: [['babel-preset-expo']],
  };
};
