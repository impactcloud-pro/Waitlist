import hooks from 'eslint-plugin-react-hooks';

export default [
  hooks.configs.recommended,
  {
    ignores: ["dist"],
  },
];
