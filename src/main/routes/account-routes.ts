import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeRegisterController, makeLoginController } from "../../main/factory"
import { makeLoadByToken } from "../../main/factory/makeLoadByToken"
import { checkToken } from "../../main/config/verify-token"

export default (router: Router): void => {
  router.post('/account/register', adaptRoute( makeRegisterController() ))    
  router.post('/account/login', adaptRoute( makeLoginController() ))    
  router.get('/account/loadbytoken', checkToken, adaptRoute( makeLoadByToken() ))    
}