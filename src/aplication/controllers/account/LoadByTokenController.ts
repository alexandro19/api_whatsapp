import { Controller, HttpRequest, HttpResponse } from "../../interfaces"
import { badRequest, noContent, ok, serverError } from "../../helpers/HttpHelpers"
import { MissingParam } from "../../errors"
import { LoadAccountByToken } from "../../../entities/account/LoadAccountByToken"

export class LoadByTokenController implements Controller {
  constructor(private readonly loadAccountByToken: LoadAccountByToken){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['accessToken']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const { accessToken } = httpRequest.body

      const account = await this.loadAccountByToken.load(accessToken)

      if(!account){
        return noContent()  
      }

      return ok(account)

    } 
    catch (error) {
      return serverError(error)  
    }  
  }
}