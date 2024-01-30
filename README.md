# mock 服务

## 支持
- 完全支持 mockjs 语法
- 支持配置响应延迟

## 安装
```
$ npm install mock-server --save-dev
```

## 使用

### 方法参数说明

#### start
> 启动 mock

| 参数名 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| app | 启动的 express 实例 | express.Application  | - |
| config | 额外配置 | object  | - |

confg <br>
| 参数名 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| timeout | 延迟响应时间，必须传入数值或者一个数值范围，范围以 - 分割 例```800-1000``` | number\|string  | - |
| folderName | 指定 mock 文件夹名称 | string  | mock |


### vue 中使用示例
```
// vue.config.js

const mock = require('mock-server');

// 针对 vue-cli&webpack 的不同版本
module.exports = {
  devServer: {
    before(app) {
      // 建议通过环境变量来控制是否开启 mock 服务
      if (process.env.VUE_APP_IS_MOCK === 'true') {
        mock.start(devServer.app, { timeout: '800-1000', folderName: 'mock' });
      }
    }
  }
}


module.exports = defineConfig({
  devServer: {
    setupMiddlewares(middlewares, devServer) {
      if (process.env.VUE_APP_IS_MOCK === 'true') {
        mock.start(devServer.app, { timeout: '800-1000', folderName: 'mock' });
      }
      return middlewares;
    }
  }
})
```

### 项目中具体示例参考
https://github.com/LHF678/vue2-project-work-template.git
