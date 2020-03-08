import Koa from 'koa'
import json from 'koa-json'
import onError from 'koa-onerror'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa2-cors'
import koaJwt from 'koa-jwt'
import moment from "moment"
import routes from './routes'
import { Secret } from './config/db'
const path = require('path')

const app = new Koa()
// koa有error事件，当发生错误，可以通过error事件，对错误统一处理
onError(app)

// 日志分析
app.use(logger((str) => {console.log(moment().format('YYYY-MM-DD HH:mm:ss')+str)}))

// 服务权限认证 (除去/h5下的接口)
// app.use(koaJwt({secret: Secret}).unless({path: [/\/h5/]}))

// 设置跨域处理
app.use(cors({
  origin: function (ctx) { return '*' }, // 允许来自所有域名请求
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 用来解析body，比如通过post来传递表单、json或上传文件，数据不容易获取，通过koa-bodyparser解析之后，在koa中this.body就能获取到数据
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  onError: function (ctx) {ctx.throw('解析失败')}
}))

// 美观的输出JSON response的Koa中间件
app.use(json())

// koa的静态文件指定映射路径
app.use(require('koa-static')(path.join(__dirname + './public')))

// 自定义中间件
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// 初始化路由，在路由模块中处理
routes(app)

// 监听端口
app.listen(8001, () => {console.log('服务启动成功:localhost:8001')})
