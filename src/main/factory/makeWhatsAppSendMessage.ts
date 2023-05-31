import config from '../config/env'
import { Controller } from '../../aplication/interfaces/Controller'
import { SendMessageController } from '../../aplication/controllers/whatsapp/SendMessageController'
import { SendMessageUseCase } from '../../usecases/whatsapp/SendMessageUseCase'
import { WhatsAppWebSendMessage } from '../../infra/whatsApp/whatsappWeb/WhatsAppWebSendMessage'
import { SessionMemory } from '../../infra/session/sessionMemory/SessionMemory'
import { LibPhoneNumber } from '../../infra/phoneNumber/libPhoneNumberJs'
import { WppConnectSendMessage } from '../../infra/whatsApp/wppConnect/WppConnectSendMessage'
import { EngineSendMessage } from '../../usecases/interfaces'

export const makeSendMessageController = (): Controller => {
  let engineSendMessage: EngineSendMessage
  const sessionMemory  = new SessionMemory()
  const libPhoneNumber = new LibPhoneNumber()
  
  if(config.engine == 1){
    engineSendMessage = new WppConnectSendMessage(sessionMemory, libPhoneNumber, libPhoneNumber)
  }
  else if (config.engine == 2){
    engineSendMessage = new WhatsAppWebSendMessage(sessionMemory, libPhoneNumber, libPhoneNumber)
  }
  
  const sendMessage = new SendMessageUseCase(engineSendMessage, sessionMemory)
  return new SendMessageController(sendMessage)
}