const server = require('./server')
const router = require('./router')
const requestHandeler = require('./requestHandlers')
const handle = { // 用对象的形式引入不同的处理函数
  '/': requestHandeler.start,
  '/start': requestHandeler.start,
  '/upload': requestHandeler.upload,
  '/show': requestHandeler.show
} // handle是处理程序的集合, 用不同的url映射到不同的处理函数上
server.start(router.route, handle)
