import { EditKeyWord } from "../../../entities/keyword/EditKeyWord"
import { Controller, HttpRequest, HttpResponse } from "../../../aplication/interfaces"
import { badRequest, created, serverError } from "../../../aplication/helpers/HttpHelpers"
import { MissingParam } from "../../../aplication/errors"

export class EditKeyWordController implements Controller{
  constructor(private readonly editKeyWord: EditKeyWord) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['id', 'campaign', 'keyword', 'userId']
      
      for(var field of requiredField){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const {id, campaign, keyword, userId} = httpRequest.body

      const editing = await this.editKeyWord.edit({id, campaign, keyword, userId})  
      
      if(!editing){
        return serverError(new Error('Ocorreu um erro ao atualizar a palavra chave'))
      }
      
      return created({editing})
    } 
    catch (error) {
      return serverError(error)  
    }  
  }
}