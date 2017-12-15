## How to use
1. 首先安装依赖 npm install 
2. 启动数据模拟 npm run mock
3. 启动服务监听 npm run start
4. 打开本地的9000端口

## 使用的技术
* React
* React-router
* Redux
* fetch
* Mock

## 开发文档
### 开发环境的搭建（使用Yeoman）：
1. 安装yeoman npm install yeoman
2. 使用yeoman生成项目 yo react-webpack

### 优化方案
* 性能检测工具 react-addons-perf –save
* PureRenderMixin优化shouldComponentUpdate

### 测试方案
* 使用mock（koa、koa-router）模拟数据的传递

## 项目目录结构
* cfg webpack配置文件
* dist 项目生成目录
* docs 项目文档
* test 测试目录
* mock 数据模拟
* src 项目资源
	* action Redux - action
	* components 木偶组件（UI组件）
	* containers 智能组件（逻辑组件）
	* config 不同环境的配置文件
	* constants Redux const 常量的定义
	* fetch get/post数据
	* reducers Redux reducers的拆分
	* stores Redux store文件
	* router 路由配置
	* styles 公用的静态css文件
	* fonts 公用的字体文件
	* util 工具函数
	* images 图片资源
	* sources 项目为flux预留的文件夹，对于flux还不够了解。



