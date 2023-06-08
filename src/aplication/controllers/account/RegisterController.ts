import { Register, Login } from "../../../entities/account"
import { Controller, HttpRequest, HttpResponse } from "../../../aplication/interfaces"
import { badRequest, created, serverError } from "../../../aplication/helpers/HttpHelpers"
import { MissingParam } from "../../../aplication/errors"

export class RegisterController implements Controller {
  constructor(
    private readonly register: Register,
    private readonly login: Login){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['nome', 'email', 'celular', 'password']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }

      const { nome, email, celular, password } = httpRequest.body
      const result = await this.register.create({nome, email, celular, password})
      
      if(result.error){
        return serverError(result.error)
      }
      
      const authentication = await this.login.auth({email, password})

      if(authentication.error){
        return serverError(result.error)  
      }

      return created(authentication.token)

    } 
    catch (error) {
      return serverError(error)  
    }  
  }
}