const path = require('path')
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: path.dirname('src' ),
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
