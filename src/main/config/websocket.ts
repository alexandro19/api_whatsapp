import { io } from "./app"

let clients: Array<any> = []

io.on('connection', (client) => {
  console.log(`Socket conectado: ${client.id}`)
  clients.push(client)

  client.on('disconect', () => {
    clients.splice(clients.indexOf(client), 1)
    console.log(`Client disconnected ${client.id}`)
  })
})