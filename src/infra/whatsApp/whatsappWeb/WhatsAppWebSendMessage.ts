import { SendMessage } from 'entities/whatsapp/SendMessage'
import { EngineSendMessage, ParsePhone, SessionRepository, ValidPhone } from '../../../usecases/interfaces'
import { MessageMedia } from 'whatsapp-web.js'
import { unlink } from 'fs'

export class WhatsAppWebSendMessage implements EngineSendMessage {
  
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly validPhone: ValidPhone,
    private readonly parsePhone: ParsePhone){}

  async send(params: SendMessage.Params): Promise<SendMessage.Result> {
    const response: SendMessage.Result = { success: false }
    
    if(!await this.validPhone.isValid(params.number)){
      response.error = new Error('Número inválido')
      return response
    }
   
    let phoneNumber = await this.parsePhone.parse(params.number)
    phoneNumber     = await phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`
    const engine    = await this.sessionRepository.getSession(params.session)
    const contacts  = await engine.client.getNumberId(phoneNumber) 

    if(contacts){
      phoneNumber = contacts._serialized
    }

    try {
      await engine.client.sendMessage(phoneNumber, params.message)
      
      for(const file of params.files){
        let messageMedia = MessageMedia.fromFilePath(file)
        engine.client.sendMessage(phoneNumber, '', {
          media: messageMedia
        })
        unlink(file, (error) => {
          if(error){
            console.log(`Não foi possível remover o arquivo ${file} Erro: ${error}`)
          }
        })
      }

      response.success = true
      return response
    } 
    catch (error) {
      response.error = error
      return response
    }
  }
}