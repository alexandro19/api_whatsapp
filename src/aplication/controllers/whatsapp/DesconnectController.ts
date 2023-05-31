import { Desconnect } from '../../../entities/whatsapp/Desconnect'
import { Controller, HttpRequest, HttpResponse } from '../../../aplication/interfaces'
import { badRequest, ok, serverError } from '../../../aplication/helpers/HttpHelpers'
import { MissingParam } from '../../../aplication/errors'

export class DesconnectController implements Controller {
  constructor(
    private readonly desconnect: Desconnect){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { session } = httpRequest.body  
      if(!session){
        return badRequest(new MissingParam('session'))
      }
      const result = await this.desconnect.close({session})
      
      if(result.error){
        return serverError(result.error)
      }

      return ok(result)
    } 
    catch (error) {
      return serverError(error)
    }
  }
}