import { SendMidea } from '../../../entities/whatsapp/SendMidea'
import { Controller, HttpRequest, HttpResponse } from '../../../aplication/interfaces'
import { badRequest, ok, serverError } from '../../../aplication/helpers/HttpHelpers'
import { MissingParam } from '../../../aplication/errors'
import { fetchFiles } from '../../../aplication/helpers/Files'

export class SendMideaController implements Controller {
  constructor(private readonly sendMidea: SendMidea){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['session', 'number']
      
      for (var field of requiredFields) {
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      
      if(!httpRequest.files){
        return badRequest(new MissingParam('files'))
      }

      const {session, number } = httpRequest.body
      const files = await fetchFiles(httpRequest)

      const result: SendMidea.Result = await this.sendMidea.send({session, number, files})

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