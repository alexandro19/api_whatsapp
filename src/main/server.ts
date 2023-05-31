import env from "./config/env"
import { serverHttp } from "./config/app"
import './config/websocket'

serverHttp.listen(env.port, () => console.log(`Server runing at http://localhost:${env.port}`))
