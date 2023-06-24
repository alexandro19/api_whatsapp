import { AddKeyWord } from "../../../entities/keyword/AddKeyWord"
import { MissingParam } from "../../../aplication/errors"
import { badRequest, ok, serverError } from "../../../aplication/helpers/HttpHelpers"
import { Controller, HttpRequest, HttpResponse } from "../../../aplication/interfaces"

export class AddKeyWordController implements Controller {
  constructor(private readonly addKeyWord: AddKeyWord){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['campaign','keyword', 'userId']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const {campaign, keyword, userId} = httpRequest.body

      const inserted = await this.addKeyWord.add({campaign, keyword, userId})

      if(!inserted){
        return serverError(new Error('Ocorreu um erro ao inserir a palavra chave'))
      }

      return ok(inserted)
    } 
    catch (error) {
      return serverError(error)      
    }  
  }
}