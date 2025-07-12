## 前端数据监控系统

### 一、系统目标与规划

✅ 功能目标

- 实时监控前端用户行为数据

- 捕获 JS 异常、资源加载失败、网络请求异常

- 性能指标采集（FP、FCP、LCP、TTFB、FID 等）

- 自定义事件埋点（点击、曝光、页面停留）

- 数据可视化（仪表盘）

- 支持 SDK 嵌入接入

- 用户追踪（Session、设备信息）

## 二、项目结构与模块划分

### 1.SDK 采集模块

- JS 错误监控

- Promise 未捕获异常

- 静态资源加载失败

- 用户行为监听（点击、页面访问、曝光）

- 性能指标收集

- 上报机制（Beacon / XHR）

### 2. 数据上报与服务端对接

- 数据格式定义（JSON Schema）

- 上报节流/合并策略

- 上报接口设计（POST /monitor/log）

- SDK 配置项（appid、用户 id、自定义字段）

### 3. 管理后台（Dashboard）

- 用户行为数据展示

- 异常告警展示

- 报表与趋势图（Echarts / Recharts）

- 数据筛选（时间段、项目、版本、用户）

- 权限管理（可选）

## 三、WIP 工作拆解

### 1. 产品与设计阶段

- [ ] 明确监控目标与指标种类

- [ ] 原型设计（Sketch/Figma）

- [ ] 埋点需求文档（Excel 表格管理）

- [ ] 设计数据库结构（如 MongoDB、ClickHouse、ES 等）

### 2. SDK 开发阶段

- [ ] 初始化配置（AppId、版本、用户 id）

- [ ] 错误监控模块（try/catch、window.onerror、unhandledrejection）

- [ ] 性能监控模块（Performance API、web-vitals）

- [ ] 行为采集（click、routeChange、hashchange）

- [ ] 数据缓存与批量上报

- [ ] Typescript 重构（推荐）

- [ ] 支持多端（H5 / Vue / React）

### 3. 后台服务接口

- [ ] 接口定义与权限校验

- [ ] 数据清洗与入库服务

- [ ] 异常分类逻辑

- [ ] 异步处理（Kafka / RabbitMQ 可选）

- [ ] 定时任务/告警推送（钉钉/飞书/邮件）

### 4. Dashboard 开发

- [ ] 登录鉴权模块

- [ ] 首页仪表盘展示

- [ ] 性能指标页面

- [ ] 异常详情页与堆栈信息展示

- [ ] 行为回放列表（可选）

- [ ] 图表组件封装（基于 Echarts/Recharts/D3）

## 四、部署与上线

- [ ] SDK 打包（UMD/CommonJS）

- [ ] NPM 发布（私有/公开）

- [ ] 接入项目测试

- [ ] Dashboard 前端打包部署（Vite/Webpack + CDN）

- [ ] 后台服务部署（Node/Nest.js/Golang 等）


后面的问题都会以这个为前置条件， 我会在中括号[]中标记提的问题， 你也要标记回答。   
[项目结构 - 整体]  整体的项目结构给一下   
前端 - 