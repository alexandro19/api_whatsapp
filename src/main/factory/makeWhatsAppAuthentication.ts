import env from "../config/env"
import { Socket_io } from '../../infra/socket/Socket_io'
import { AuthenticationController } from '../../aplication/controllers/whatsapp/AuthenticationController'
import { Controller } from '../../aplication/interfaces/Controller'
import { QrTerminalImplements, LibQrCodeBase64 } from '../../infra/qrcode'
import { SessionMemory } from '../../infra/session/sessionMemory/SessionMemory'
import { WhatsAppWebAuthentication, WhatsAppWebIsConnected } from '../../infra/whatsApp/whatsappWeb'
import { AuthenticationUseCase } from '../../usecases/whatsapp/AuthenticationUseCase'
import { WppConnectAuthentication, WppConnectIsConnected } from '../../infra/whatsApp/wppConnect'
import { EngineAuthentication, EngineIsConnected } from "../../usecases/interfaces"
import { VenomBotAuthentication } from "../../infra/whatsApp/venonBot/VenomBotAuthentication"

export const makeAuthenticationController = (): Controller => {
  let engineAuthentication : EngineAuthentication
  let engineIsConnected    : EngineIsConnected 
  
  const qrTerminal        = new QrTerminalImplements()
  const sessionRepository = new SessionMemory()
  const socket            = new Socket_io()
  const qrCodeBase64      = new LibQrCodeBase64()
  
  if(env.engine == 1){
    engineAuthentication = new WppConnectAuthentication(socket, sessionRepository)
    engineIsConnected    = new WppConnectIsConnected(sessionRepository)
  }
  else if (env.engine == 2){
    engineAuthentication = new WhatsAppWebAuthentication(sessionRepository, qrTerminal, socket, qrCodeBase64)
    engineIsConnected    = new WhatsAppWebIsConnected(sessionRepository)
  }
  else if (env.engine == 3){
    engineAuthentication = new VenomBotAuthentication(socket, sessionRepository)
    engineIsConnected    = new WppConnectIsConnected(sessionRepository)
  }

  const authentication   = new AuthenticationUseCase(engineAuthentication, engineIsConnected)
  
  return new AuthenticationController(authentication)
}