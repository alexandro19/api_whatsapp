import { EngineSendMidea } from '../../usecases/interfaces/engineWhatsApp/EngineSendMidea'
import { SendMidea } from '../../entities/whatsapp/SendMidea'
import { SessionRepository } from '../../usecases/interfaces'

export class SendMideaUseCase implements SendMidea {
  constructor(
    private readonly engineSendMidea: EngineSendMidea,
    private readonly sessionRepository: SessionRepository){}
  
  async send(params: SendMidea.Params): Promise<SendMidea.Result> {
    if(!await this.sessionRepository.existsSession(params.session)){
      return {
        success: false,
        error: new Error(`Sessão ${params.session} não conectada`)
      }
    }
    return await this.engineSendMidea.sendMidea(params)     
  }
}