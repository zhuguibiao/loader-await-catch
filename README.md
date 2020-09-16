# loader-await-catch
> 一个自动为 await 注入 catch 语句的 webpack loader

开发中或多或少需要对 **await** 进行 **catch** 操作，而这些操作则会让你项目中代码变的臃肿，所以衍生出来 **loader-await-catch** 这么一个 **webpack loader** 对你项目中的 **await** 自动注入 **catch** 操作的代码。
## Install
```bash
npm i loader-await-catch -D
```
or 
```bash
yarn add loader-await-catch -D
``` 
## Usage
```js
// webpack.config.js

module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'loader-await-catch',
        option: {
          callback: (err)=>{
            console.log(err)
          },
        }
      }
    }
  ]
}
```