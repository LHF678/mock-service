# mock 服务模拟后端接口响应

## 支持
- 完全支持 mockjs 语法
- 支持配置响应延迟

## 安装
```
$ npm install @liuhanfei/mock-service -D
$ yarn add @liuhanfei/mock-service -D
```

## 方法参数说明

#### start 启动 mock 服务

| 参数名 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| app | 启动的 express 实例 | express.Application  | - |
| config | 额外配置 | object  | - |

##### config

| 参数名 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| timeout | 延迟响应时间，必须传入数值或者一个数值范围，范围以 - 分割 例```800-1000``` | number string  | - |
| folderName | 指定 mock 文件夹名称 | string  | mock |

## 使用

> 1、请在项目根目录下新建 mock 文件目录 <br>
2、请以 http 请求方法命名子目录（如：get、post），支持方法 ```get、post、delete、put``` <br>
3、项目中不同的请求方法分别放置对应的以请求方法命名的子目录下，目录下新建 ```xxx_xxx_xxx.json``` 文件，书写响应 json 报文，支持以 ```mockJs``` 数据模板定义

### json 文件命名规范
如果要请求路径为：```/get/user/info => get_user_info.json``` <br>
如果要请求路径本身存在_：```/get/user/org_info => get_user_org__info.json``` <br>
注：除 .json 以外的文件都会忽略

## 目录规范示例
```
├── mock
│ ├── get
│ │ ├── xxx_xxx_xxx.json
│ │ └── xxx_xxx_xxx.json
│ ├── post
│ │ ├── xxx_xxx_xxx.json
│ │ └── xxx_xxx_xxx.json
```

### vue 中使用示例
```
// vue.config.js

const mock = require('@liuhanfei/mock-service');

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
