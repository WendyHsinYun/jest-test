# jest-test

### Install Jest 

初始化 node.js 專案

`npm init`

package.json：

```
{
  "name": "jest-testing",
  "version": "1.0.0",
  "description": "jest testing",
  "main": "jest.js",
  "scripts": {
    "test": "jest" // npm test 等同於 npm jest
  },
  "author": "hsinyunChang",
  "license": "ISC"
}
```

### 安裝 jest

`npm install --save-dev jest`

### 安裝 babel

安裝 babel，才能將 ES6 module 語法轉換成 node.js 能夠理解的 require/module.exports 格式

`npm install --dev babel-jest @babel/core @babel/preset-env`

`touch babel.config.js`

#### 新增 babel.config.js ，設置如下

```
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```
