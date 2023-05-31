import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeAuthenticationController, makeSessionController, makeSendMessageController, makeSendMideaController, makeDesconnectController } from "../factory"
import { anexoUpload } from "../../main/config/anexosUpload"

export default (router: Router): void => {
  router.post('/authentication', adaptRoute(makeAuthenticationController()))  
  router.post('/desconnect', adaptRoute(makeDesconnectController()))  
  router.post('/status', adaptRoute(makeSessionController()))  
  router.post('/send', anexoUpload.array('anexos'), adaptRoute(makeSendMessageController()))  
  router.post('/sendmidea', anexoUpload.array('anexos'), adaptRoute(makeSendMideaController()))  
}