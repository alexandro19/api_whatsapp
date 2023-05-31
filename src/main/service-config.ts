const Service = require('node-windows').Service
var dir = require('path').join(process.cwd(), './main/server.js')

const svc = new Service({
  name: "Terasoft-WhatsApp",
  description: "Api nodejs com whatsapp.web.js",
  script: dir,
  wait: 2,
  grow: .5 
})

export {svc}