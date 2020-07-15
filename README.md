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
.babelrc            # babel配置文件
.justreq            # justreq配置文件
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
本框架以路由为单位切分子系统及页面，页面路径`/routes/[子系统]/[页面]`

故，做以下约定：

1. 页面私有组件存放在`/routes/[子系统]/[页面]/components/`即可，不要放入公共组件库
2. 页面私有model也存放在页面路径下，如`/routes/[子系统]/[页面]/model.js`
3. 页面路由统一命名为`route.js`，存入于页面路径`/routes/[子系统]/[页面]/route.js`

### 路由配置
为实现按需加载及路由拦截，路由须统一配置为异步加载。以下是`/routes/home/route.js`示例：
```javascript
export default [
  {
    breadcrumbName: '用户信息管理',
    path: '/users',
    models: Model,
    component: UserList
  },
];
```
如需配置子路由，添加routes节点即可：
```javascript
export default [
  {
    breadcrumbName: '用户信息管理',
    path: '/users',
    model: Model,
    component: UserList,
    routes: [
      {
        breadcrumbName: '用户详情',
        path: '/users/detail',
        component: Detail,
      }
    ]
  },
];
```

add by pika

*******************************
.*(END)*
