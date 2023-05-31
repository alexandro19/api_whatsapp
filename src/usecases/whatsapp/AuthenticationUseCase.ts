import { EngineIsConnected } from '../../usecases/interfaces/engineWhatsApp/EngineIsConnected'
import { Authentication } from '../../entities/whatsapp/Authentication'
import { EngineAuthentication } from '../interfaces/engineWhatsApp/EngineAuthentication'

export class AuthenticationUseCase implements Authentication {
  
  constructor(
    private readonly engineWhatsApp: EngineAuthentication,
    private readonly engineIsConnected: EngineIsConnected){}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    if(await this.engineIsConnected.isConnected(params.session)){
      return {
        authenticated: true  
      }
    }
    const authenticated = await this.engineWhatsApp.authentication(params.session)
    return { 
      authenticated 
    }
  }
}