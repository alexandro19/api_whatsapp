import { SendMessage } from '../../../entities/whatsapp/SendMessage'

export interface EngineSendMessage {
  send(params: SendMessage.Params): Promise<SendMessage.Result>      
}