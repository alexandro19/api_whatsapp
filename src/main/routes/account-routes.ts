import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeRegisterController } from "../../main/factory/makeRegister"

export default (router: Router): void => {
  router.post('/account/register', adaptRoute( makeRegisterController() ))    
}