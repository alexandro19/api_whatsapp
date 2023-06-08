import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeAuthenticationController, makeSessionController, makeSendMessageController, makeSendMideaController, makeDesconnectController } from "../factory"
import { anexoUpload } from "../../main/config/anexosUpload"

export default (router: Router): void => {
  router.post('/whatsapp/authentication', adaptRoute(makeAuthenticationController()))  
  router.post('/whatsapp/desconnect', adaptRoute(makeDesconnectController()))  
  router.post('/whatsapp/status', adaptRoute(makeSessionController()))  
  router.post('/whatsapp/send', anexoUpload.array('anexos'), adaptRoute(makeSendMessageController()))  
  router.post('/whatsapp/sendmidea', anexoUpload.array('anexos'), adaptRoute(makeSendMideaController()))  
}