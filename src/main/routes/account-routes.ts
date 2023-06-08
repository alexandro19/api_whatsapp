import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeRegisterController, makeLoginController } from "../../main/factory"

export default (router: Router): void => {
  router.post('/account/register', adaptRoute( makeRegisterController() ))    
  router.post('/account/login', adaptRoute( makeLoginController() ))    
}