import { SessionRepository } from '../../usecases/interfaces'
import { Desconnect } from '../../entities/whatsapp/Desconnect'
import { EngineDesconnect } from '../../usecases/interfaces/engineWhatsApp/EngineDesconnect'

export class DesconnectUseCase implements Desconnect {
  
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly engineDesconnect: EngineDesconnect) {
  }

  async close(params: Desconnect.params): Promise<Desconnect.Result> {
    if(!await this.sessionRepository.existsSession(params.session)){
      return {
        desconnected: false,
        error: new Error(`A sessão ${params.session} não foi localizada`)
      }
    }
    return await this.engineDesconnect.desconnect(params)
  }
}