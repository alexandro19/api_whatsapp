import { MissingParam } from '../../errors/MissingParam'
import { badRequest, ok, serverError } from '../../helpers/HttpHelpers'
import { Controller } from '../../interfaces/Controller'
import { HttpRequest, HttpResponse } from '../../interfaces/Http'
import { Authentication } from '../../../entities/whatsapp/Authentication'


export class AuthenticationController implements Controller {
  
  constructor(private readonly authentication: Authentication){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    try {
      const {session} = httpRequest.body

      if(!session){
        return badRequest(new MissingParam('session'))
      }

      const result = await this.authentication.auth({session})
      
      if(!result.authenticated){
        return serverError(new Error('Ocorreu um erro ao autenticar a sessão'))
      }
      
      return ok(result)  
    } 
    catch (error) {
      return serverError(error)  
    }
  }
}