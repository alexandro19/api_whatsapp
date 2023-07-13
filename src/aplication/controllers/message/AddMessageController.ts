import { AddMessage } from "../../../entities/message/AddMessage"
import { MissingParam } from "../../../aplication/errors"
import { badRequest, created, serverError } from "../../../aplication/helpers/HttpHelpers"
import { Controller, HttpRequest, HttpResponse } from "../../../aplication/interfaces"

export class AddMessageController implements Controller {
  constructor(private readonly addMessage: AddMessage){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['keywordId', 'order', 'minutes', 'seconds', 'type', 'message']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest( new MissingParam(field))
        }
      }
      
      const {keywordId, order, minutes, seconds, type, message} = httpRequest.body

      let archive: string = ''

      if(httpRequest.file){
        archive = httpRequest.file.filename
      }

      const inserted = await this.addMessage.add({keywordId, order, minutes, seconds, type, message, archive})

      if(!inserted){
        return serverError(new Error('Ocorreu um erro ao inserir a mensagem'))  
      }

      return created({inserted})
    } 
    catch (error) {
      return serverError(error)  
    }
  }
}