const body = require('./html')
const fs = require('fs')
const querystring = require('querystring')
const formidable = require('formidable')
const util = require('util')
function start(response) {
  console.log("Request handler 'start' was called.")
  const wait = () => {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(body.body) // 我也不知道为什么变成obj了
    response.end()
  }
  setTimeout(() => {
    wait()
  }, 1000)
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.")
  // response.writeHead(200, { 'Content-Type': 'text/plain' })
  // response.write(`You have sent : ${querystring.parse(postData).text}`)
  // response.end()
  var form = new formidable.IncomingForm()
  console.log('about to parse')
  form.parse(request, function(error, fields, files) {
    console.log('parsing done', files) // files一直是空对象，无法解决 ********** 解决了，在server里删除request.setEncoding('utf8')
    // fs.renameSync(files.upload.path, "C:/Users/Vito_Zhu/AppData/Local/Temp/testv.png")
    // fs.renameSync(files.upload.path, '../assets/testv.png') // 这样子无法进行跨盘符操作
    let readStream = fs.createReadStream(files.upload.path)
    let writeStream = fs.createWriteStream('../assets/testv.png')
    readStream.pipe(writeStream)

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('received image:<br/>')
    response.write("<img src='/show' />")
    response.end()
  })
}

function show(response, postData) {
  // 图片展示页面
  console.log("Request handler 'show' was called.")
  fs.readFile(
    '../assets/testv.png',
    'binary',
    function(error, file) {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' })
        response.write(error + '\n')
        response.end()
      } else {
        response.writeHead(200, { 'Content-Type': 'image/png' })
        response.write(file, 'binary')
        response.end()
      }
    }
  )
}
exports.start = start
exports.upload = upload
exports.show = show
