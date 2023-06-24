import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeAddKeyWordController } from "../../main/factory/makeAddKeyWord"
import { checkToken } from "../../main/config/verify-token"

export default (router: Router): void => {
  router.post('/keyword', checkToken ,adaptRoute( makeAddKeyWordController() ))        
}