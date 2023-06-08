import env from "./config/env"
import './config/websocket'
import { MongoHelper } from "../infra/db/helpers/mongo-helper"

MongoHelper.connect(env.mongoUrl)
  .then( async () => {
    const app = (await import('./config/app')).serverHttp
    app.listen(env.port, () => console.log(`Server runing at http://localhost:${env.port}`))
  })
  .catch(console.error)