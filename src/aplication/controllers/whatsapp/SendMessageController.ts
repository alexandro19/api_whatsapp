import { MissingParam } from '../../errors/MissingParam'
import { badRequest, serverError, ok } from '../../helpers/HttpHelpers'
import { SendMessage } from '../../../entities/whatsapp/SendMessage'
import { HttpRequest, HttpResponse, Controller } from '../../interfaces'
import { fetchFiles } from '../../helpers/Files'

export class SendMessageController implements Controller {
  
  constructor(private readonly send: SendMessage){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['session', 'number', 'message']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }  

      let files = []
      if(httpRequest.files){
        files = await fetchFiles(httpRequest)
      }

      const {session, number, message} = httpRequest.body
      const result = await this.send.send({session, number, message, files})
      if(result.success){
        return ok(result)
      }

      return serverError(result.error)
    } 
    catch (error) {
      return serverError(error)
    }  
  }
}