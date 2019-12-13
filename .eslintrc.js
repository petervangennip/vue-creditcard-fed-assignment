module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/prettier',
    'plugin:vue-a11y/base',
    'plugin:prettier/recommended',
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/require-component-is": "off",
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

