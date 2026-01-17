module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
          autoProcessImports: ['react-native-unistyles'],
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
