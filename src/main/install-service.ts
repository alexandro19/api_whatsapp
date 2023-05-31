import { svc } from "./service-config"

svc.on('install', () => {
  svc.start()
})

svc.install()