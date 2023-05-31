import { svc } from "./service-config"

svc.on('uninstall', () => {
  svc.stop()
})

svc.uninstall()