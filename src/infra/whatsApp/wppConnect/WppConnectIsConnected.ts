import { SessionRepository } from '../../../usecases/interfaces'
import { EngineIsConnected } from '../../../usecases/interfaces/engineWhatsApp/EngineIsConnected'

export class WppConnectIsConnected implements EngineIsConnected {
  constructor(private readonly sessionRepository: SessionRepository){}

  async isConnected(session: string): Promise<boolean> {
    return await this.sessionRepository.existsSession(session)
  }      
}