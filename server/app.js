const http = require('http')
const fs = require('fs')
const path = require('path')
const Stream = require('stream') // 用来判断是否为stream实例

const hostname = '127.0.0.1'
const port = 10002
const postfixArr = [
  {
    value: '.js',
    type: 'application/javascript'
  },
  {
    value: '.css',
    type: 'text/css'
  },
  {
    value: '.html',
    type: 'text/html;charset=utf-8'
  },
  {
    value: '.ico',
    type: 'image/x-icon'
  },
  {
    value: '.jpg',
    type: 'image/jpeg'
  },
  {
    value: '.png',
    type: 'image/png'
  }
]
const middleFn = (context) => {
  const { req, res } = context
  let contentType = 'text/plain'
  let rs = 'Hello, World!\n'
  let {
    url,
    method
  } = req
  url = decodeURIComponent(url).split('?')[0]
  if (url && method.toLowerCase() === 'get') {
    if (postfixArr.some(v => {
      if (~url.indexOf(v.value)) {
        contentType = v.type
        return true
      }
      return false
    })) {
      let dist = path.resolve(__dirname, path.join('../dist', url))
      try {
        let isStat = fs.statSync(dist)
        if (isStat.isFile) {
          rs = fs.createReadStream(dist)
        }
      } catch (err) {
        res.statusCode = 404
        res.end('404')
        return
      }
    }
  }
  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  if (rs instanceof Stream) {
    rs.pipe(res)
  } else {
    res.end(rs)
  }
}
const server = http.createServer((req, res) => {
  middleFn({ req, res })
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})
