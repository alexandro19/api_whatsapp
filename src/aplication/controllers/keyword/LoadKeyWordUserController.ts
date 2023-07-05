import { MissingParam } from "../../../aplication/errors"
import { badRequest, ok, serverError } from "../../../aplication/helpers/HttpHelpers"
import { Controller, HttpRequest, HttpResponse } from "../../../aplication/interfaces"
import { LoadKeyWordUser } from "../../../entities/keyword/LoadKeyWordUser"

export class LoadKeyWordUserController implements Controller {
  
  constructor(private readonly loadKeyWordUser: LoadKeyWordUser){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['userId']
      
      for(var field of requiredFields){
        if(!httpRequest.query[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const { userId } = httpRequest.query

      const keyWords = await this.loadKeyWordUser.load(userId)

      if(!keyWords){
        return serverError(new Error('Ocorreu um erro ao localizar as palavras chave'))
      }

      return ok(keyWords)
    } 
    catch (error) {
      return serverError(error)      
    }  
  }
}