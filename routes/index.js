import Router from 'koa-router'
import moRen from './api-server-route'
const router = new Router()

export default (app) => {
  app.use(router.routes(), router.allowedMethods()) // 注册路由
  // 主应用中加载子路由模块 (allowedMethods设置之后会在执行完毕之后根据status设置响应头)
  router.use('/api', moRen.routes(), moRen.allowedMethods())
}
