import config from '../config/env'
import { DesconnectUseCase } from '../../usecases/whatsapp/DesconnectUseCase'
import { DesconnectController } from '../../aplication/controllers/whatsapp/DesconnectController'
import { Controller } from '../../aplication/interfaces/Controller'
import { SessionMemory } from '../../infra/session/sessionMemory/SessionMemory'
import { WhatsAppWebDesconnect } from '../../infra/whatsApp/whatsappWeb/WhatsAppWebDesconnect'
import { WppConnectDesconnect } from '../../infra/whatsApp/wppConnect/WppConnectDesconnect'
import { EngineDesconnect } from '../../usecases/interfaces'

export const makeDesconnectController = (): Controller => {
  let engineDisconnect: EngineDesconnect
  const sessionRepository = new SessionMemory()
  
  if(config.engine == 1){
    engineDisconnect  = new WppConnectDesconnect(sessionRepository)
  }
  else if(config.engine == 2){
    engineDisconnect  = new WhatsAppWebDesconnect(sessionRepository)
  }
  
  const desconnect = new DesconnectUseCase(sessionRepository, engineDisconnect)
  
  return new DesconnectController(desconnect)
}