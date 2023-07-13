import { GetByKeyWord } from "../../../entities/message"
import { MissingParam } from "../../errors"
import { badRequest, ok, serverError } from "../../helpers/HttpHelpers"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces"

export class GetByKeyWordController implements Controller {
  constructor(private readonly getByKeyWord: GetByKeyWord){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['keywordId']
      
      for(var field of requiredFields){
        if(!httpRequest.query[field]){
          return badRequest( new MissingParam(field))
        }
      }
      
      const { keywordId } = httpRequest.query

      const messages = await this.getByKeyWord.get(keywordId)
      
      return ok(messages)
    } 
    catch (error) {
      return serverError(error)  
    }
  }
}