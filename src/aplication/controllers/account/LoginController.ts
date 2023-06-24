import { Login } from "../../../entities/account"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces"
import { badRequest, ok, serverError } from "../../helpers/HttpHelpers"
import { MissingParam } from "../../errors"

export class LoginController implements Controller {
  constructor(private readonly login: Login){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email','password']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const { email, password } = httpRequest.body

      const authentication = await this.login.auth({email, password})

      if(!authentication){
        return badRequest(new Error('Usuário ou senha inválido(s)'))  
      }

      return ok({ token: authentication.token })

    } 
    catch (error) {
      return serverError(error)  
    }  
  }
}