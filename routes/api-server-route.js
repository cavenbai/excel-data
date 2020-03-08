import Router from 'koa-router'
import apiController from '../controllers/api-server-controllers'
const apiRouter = new Router()

apiRouter.post('/person/excel/:id/:sheet', apiController.personTotal);

export default apiRouter
