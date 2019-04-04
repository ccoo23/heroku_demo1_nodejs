const http = require('http')
const url = require('url')
const PORT = process.env.PORT || 5000 // 不这样写，自己指定端口会没办法访问
const start = (route, handle) => {
  // 路由函数是参数
  http
    .createServer(function(request, response) {
      console.log('request has been received')
      // console.log(url.parse(request.url)) // 解析url
      // request.setEncoding('utf8')
      var postData = ''
      let pathname = url.parse(request.url).pathname
      /* ********************************************************* 原方法：将request在这里处理。新方法：将request传递至处理函数处理
      // 在server中处理接收到的post请求的数据，每次将data事件取得的数据合并，等end事件后再发送到处理函数
      request.addListener('data', function(postDataChunk) {
        // 给request添加对data和end事件的监听器
        postData += postDataChunk
        console.log("Received POST data chunk '" + postDataChunk + "'.")
      })

      request.addListener('end', function() {
        // 当end事件触发，执行route()
        route(handle, pathname, response, postData) // 把对response的处理放到处理函数中
      })*/
      route(handle, pathname, response, request) // 在别处处理request
    })
    .listen(PORT)
}
console.log('server has started')
exports.start = start
