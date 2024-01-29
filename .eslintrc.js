module.exports = {
  parser:  '@typescript-eslint/parser', // 定义 ESLint 的解析器
  extends: ['plugin:@typescript-eslint/recommended'], // 定义文件继承的子规范
  plugins: ['@typescript-eslint'], // 定义所依赖的插件
  env: { // 指定代码的运行环境
    browser: true,
    node: true
  },
  rules: {
    // 自定义你的规则
    "no-var": "error",
    "eqeqeq": 2,// 必须使用全等
    "no-multi-spaces": 2, // 不能用多余的空格
    "semi": ["error", "always"],
    "indent": ["error", 2],
  },
};