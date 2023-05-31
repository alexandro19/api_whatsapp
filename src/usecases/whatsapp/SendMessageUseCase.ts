import { EngineSendMessage } from '../interfaces/engineWhatsApp'
import { SendMessage } from '../../entities/whatsapp/SendMessage'
import { SessionRepository } from '../interfaces/SessionRepository'

export class SendMessageUseCase implements SendMessage {
  constructor(
    private readonly engineSendMessage: EngineSendMessage,
    private readonly sessionRepository: SessionRepository){}
  
  async send(params: SendMessage.Params): Promise<SendMessage.Result> {
    if(!await this.sessionRepository.existsSession(params.session)){
      const response: SendMessage.Result = {
        success: false,
        error: new Error(`Sessão: ${params.session} não conectada`)
      } 
      return response
    }
    return await this.engineSendMessage.send(params)  
  }
}