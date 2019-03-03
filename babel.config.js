const generatePresets = ({modules} = {}) => {
  return [
    ['@babel/preset-env', {
      modules: modules ? 'commonjs' : undefined,
      targets: {
        browsers: [
          'last 1 version',
          '> 1%',
          'maintained node versions',
          'not dead',
        ],
      },
      debug: true,
    }],
  ];
};

module.exports = {
  presets: generatePresets({modules: false}),
  env: {
    test: {
      presets: generatePresets({modules: true}),
    },
  },
};
