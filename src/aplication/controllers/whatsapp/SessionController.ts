import { HttpRequest, HttpResponse } from '../../interfaces/Http'
import { Controller } from '../../interfaces/Controller'
import { Session } from '../../../entities/whatsapp/Session'
import { badRequest, ok, serverError } from '../../helpers/HttpHelpers'
import { MissingParam } from '../../errors/MissingParam'

export class SessionController implements Controller {
  
  constructor(private readonly session: Session){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { session } = httpRequest.body
      if(!session){
        return badRequest(new MissingParam('session'))
      }  
      const result = await this.session.fetch({session})

      if(!result){
        return ok({connected: false})
      }
      
      const response = {
        session: result.session,
        connected: result.connected,
        qrCode: result.qrCode,
        phone: result.phone  
      }
      
      return ok(response)
    } 
    catch (error) {
      return serverError(error)
    }  
  }
}