module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@three-model/eslint-config-custom`
  extends: [
    "@three-model/eslint-config-custom"
  ],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {
    "jsx-a11y/alt-text": "off",
  }
};
