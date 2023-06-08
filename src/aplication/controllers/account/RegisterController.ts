import { Register, Login } from "../../../entities/account"
import { Controller, HttpRequest, HttpResponse } from "../../../aplication/interfaces"
import { badRequest, created, serverError } from "../../../aplication/helpers/HttpHelpers"
import { InvalidParam, MissingParam } from "../../../aplication/errors"

export class RegisterController implements Controller {
  constructor(
    private readonly register: Register,
    private readonly login: Login){}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['nome', 'email', 'celular', 'password', 'confirmPassword']
      
      for(var field of requiredFields){
        if(!httpRequest.body[field]){
          return badRequest(new MissingParam(field))
        }
      }
      const { nome, email, celular, password, confirmPassword } = httpRequest.body

      if(password != confirmPassword){
        return badRequest(new InvalidParam('confirmPassword'))
      }

      const result = await this.register.create({nome, email, celular, password})
      
      if(result.error){
        return serverError(result.error)
      }
      
      const authentication = await this.login.auth({email, password})

      if(authentication.error){
        return badRequest(authentication.error)  
      }

      return created({ token: authentication.token })

    } 
    catch (error) {
      return serverError(error)  
    }  
  }
}