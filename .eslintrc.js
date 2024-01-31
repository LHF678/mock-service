module.exports = {
  parser:  '@typescript-eslint/parser', // 定义 ESLint 的解析器
  rules: {
    // 自定义你的规则
    "no-var": "error",
    "eqeqeq": 2,// 必须使用全等
    "no-multi-spaces": 2, // 不能用多余的空格
    "semi": ["error", "always"],
    "indent": ["error", 2],
  },
};
