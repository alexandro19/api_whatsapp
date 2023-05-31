import { Desconnect } from '../../../entities/whatsapp/Desconnect'
import { SessionRepository } from '../../../usecases/interfaces'
import { EngineDesconnect } from '../../../usecases/interfaces/engineWhatsApp/EngineDesconnect'

export class WhatsAppWebDesconnect implements EngineDesconnect {
  constructor(
    private readonly sessionRepository: SessionRepository){}
  
  async desconnect(params: Desconnect.params): Promise<Desconnect.Result> {
    const engine = await this.sessionRepository.getSession(params.session) 
    
    try {
      await engine.client.logout()
      this.sessionRepository.deleteSession(params.session)
      return {
        desconnected: true
      }
    } 
    catch (error) {
      return {
        desconnected: false,
        error: error
      }
    }
    
  }
}