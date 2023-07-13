import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { checkToken } from "../../main/config/verify-token"
import { makeAddMessageController } from "../../main/factory/makeAddMessage"
import { archiveUpload } from "../../main/config/archiveUpload"
import { makeGetByKeyWordController } from "../../main/factory/makeGetByKeyWord"
import { makeEditMessageController } from "../../main/factory/makeEditMessage"

export default (router: Router): void => {
  router.get('/message', checkToken , adaptRoute( makeGetByKeyWordController()))                
  router.post('/message', checkToken , archiveUpload.single("archive"), adaptRoute( makeAddMessageController()))                
  router.patch('/message', checkToken , archiveUpload.single("archive"), adaptRoute( makeEditMessageController()))                
}