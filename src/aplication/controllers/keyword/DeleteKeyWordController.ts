import { DeleteKeyWord } from "../../../entities/keyword"
import { MissingParam } from "../../errors"
import { badRequest, ok, serverError } from "../../helpers/HttpHelpers"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces"

export class DeleteKeyWordController implements Controller {
  constructor(private readonly deleteKeyWord: DeleteKeyWord){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {id} = httpRequest.query
      
      if(!id){
        return badRequest(new MissingParam('id'))
      }
      
      const deleted = await this.deleteKeyWord.delete(id)

      if(!deleted){
        return serverError(new Error('Ocorreu um erro ao deletar a palavra chave'))
      }

      return ok({deleted})
    } 
    catch (error) {
      return serverError(error)      
    }  
  }
}