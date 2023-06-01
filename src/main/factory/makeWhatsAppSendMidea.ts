import config from '../config/env'
import { SendMideaUseCase } from '../../usecases/whatsapp/SendMideaUseCase'
import { SendMideaController } from '../../aplication/controllers/whatsapp/SendMideaController'
import { Controller } from '../../aplication/interfaces'
import { WhatsAppWebSendMidea } from '../../infra/whatsApp/whatsappWeb/WhatsAppWebSendMidea'
import { SessionMemory } from '../../infra/session/sessionMemory/SessionMemory'
import { LibPhoneNumber } from '../../infra/phoneNumber/libPhoneNumberJs'
import { WppConnectSendMidea } from '../../infra/whatsApp/wppConnect/WppConnectSendMidea'
import { EngineSendMidea } from '../../usecases/interfaces'
import { VenomBotSendMidea } from '../../infra/whatsApp/venonBot'

export const makeSendMideaController = (): Controller => {
  let engineSendMidea: EngineSendMidea
  
  const libPhone          = new LibPhoneNumber()
  const sessionRepository = new SessionMemory()
  
  if(config.engine == 1){
    engineSendMidea = new WppConnectSendMidea(sessionRepository, libPhone, libPhone) 
  }
  else if(config.engine == 2){
    engineSendMidea = new WhatsAppWebSendMidea(sessionRepository, libPhone, libPhone)
  }
  else if(config.engine == 3){
    engineSendMidea = new VenomBotSendMidea(sessionRepository, libPhone, libPhone)
  }
    
  const sendMidea = new SendMideaUseCase(engineSendMidea, sessionRepository)
  
  return new SendMideaController(sendMidea)
}