const config = {
  stories: ['../src/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  // https://github.com/storybookjs/storybook/issues/11146#issuecomment-645341199
  typescript: {
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    },
  },
};

module.exports = config;
