import { Controller, HttpRequest, HttpResponse } from "../../interfaces"
import { badRequest, created, serverError } from "../../helpers/HttpHelpers"
import { MissingParam } from "../../errors"
import { EditMessage } from "../../../entities/message"

export class EditMessageController implements Controller {
  constructor(private readonly editMessage: EditMessage) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['id', 'keywordId', 'order', 'minutes', 'seconds', 'type', 'message']
      
      for(var field of requiredField){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const {id, keywordId, order, minutes, seconds, type, message} = httpRequest.body

      let archive: string = ''

      if(httpRequest.file){
        archive = httpRequest.file.filename
      }

      const editing = await this.editMessage.edit({id, keywordId, order, minutes, seconds, type, message, archive})  
      
      if(!editing){
        return serverError(new Error('Ocorreu um erro ao atualizar a mensagem'))
      }
      
      return created({editing})
    } 
    catch (error) {
      return serverError(error)  
    }  
  }
}