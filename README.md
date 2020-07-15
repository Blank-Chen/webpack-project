# webpack基础骨架屏，目前基于DVA & REACT & ANTD，后期将支持VUE

## 开发框架
webpack & react & dva & antd

## 项目结构
```
+ mock              # 模拟api文件
+ public            # 公共文件，不会被构建
- src               # 源码目录
  + assets          # 静态资源
  + components      # 公共组件库
  + models          # 公共model
  - routes          # 路由
    + [子系统]/[页面]
  + services        # 接口调用文件
  + utils           # 工具类
    constants.js    # 全局使用的常量
    router.config.js# 路由入口配置
.babelrc            # babel配置文件
README.md
```

## 安装配置
### 环境要求
- node版本: >v8.10.0
- yarn版本: >v1.15.1

### Node环境安装
首先下载安装[Node.js](https://nodejs.org/en/)，然后运行以下命令安装yarn
```shell
npm install -g yarn
```

### 脚手架安装
运行以下命令安装脚手架及项目依赖
```shell
yarn
```

## 启动脚手架
运行以下命令启动parcel-bundler
```shell
npm start  
```

## 开发指引
该分支在基于少量路由系统，所有路由入口文件可以在router.config.js中配置并
dynamic按需引入了页面中的所有路由，dynamic按需引入路由同时也注册了该路由组件需要用到的model

### 路由配置
为实现路由按需加载，请在router.config.js中配置所有路由，dynamic中的app instance为dva创建的app instance
```javascript
[{
    path: '/',
    pathname: '首页',
    component: app => dynamic({
        app,
        component: () => import('./routes/home'),
        models: () => [
            import('./models/home'),
        ]
    })
}, {
    path: '/integral',
    pathname: 'Menu1',
    component: app => dynamic({
        app,
        component: () => import('./routes/menu/index'),
        models: () => [
            import('./models/menu/model'),
        ]
    })
}]
```

add by pika

*******************************
.*(END)*
