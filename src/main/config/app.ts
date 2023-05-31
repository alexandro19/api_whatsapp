import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import http from 'http'

const app = express()
const socket = require('socket.io')

const serverHttp = http.createServer(app)

const io = socket(serverHttp, {
  path: '/socket.io',
  cors: {
    origins: ["*"],
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})

setupMiddleware(app)
setupRoutes(app)

app.get('/', (req, res) => {
  res.send('Api rodando')
})

export {serverHttp, io}