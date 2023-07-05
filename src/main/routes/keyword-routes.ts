import { Router } from "express"
import { adaptRoute } from "../adapters/ExpressRouteAdapter"
import { makeAddKeyWordController } from "../../main/factory/makeAddKeyWord"
import { checkToken } from "../../main/config/verify-token"
import { makeLoadKeyWordUserController } from "../../main/factory/makeLoadKeyWord"
import { makeEditKeyWordController } from "../../main/factory/makeEditKeyWord"
import { makeDeleteKeyWordController } from "../../main/factory/makeDeleteKeyWord"

export default (router: Router): void => {
  router.post('/keyword', checkToken , adaptRoute( makeAddKeyWordController() ))        
  router.patch('/keyword', checkToken , adaptRoute( makeEditKeyWordController() ))        
  router.get('/keyword' , checkToken , adaptRoute( makeLoadKeyWordUserController() ))        
  router.delete('/keyword' , checkToken , adaptRoute( makeDeleteKeyWordController() ))        
}