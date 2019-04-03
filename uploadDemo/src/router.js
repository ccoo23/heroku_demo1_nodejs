const route = (handle, pathname, response, request) => {
  console.log('A request for ' + pathname)
  // 如果handle.xx是函数则执行，否则报错
  console.log(handle[pathname])
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request) // 这样避免了无数的if判断url , 给handle传递post参数
  } else {
    console.log('No request handler found for ' + pathname)
    response.writeHead(404);
    response.write('404 NOT FOUND')
    response.end()
  }
}
exports.route = route
