import { EngineSendMidea, ParsePhone, SessionRepository, ValidPhone } from '../../../usecases/interfaces'
import { MessageMedia } from 'whatsapp-web.js'
import { unlink } from 'fs'
import { SendMidea } from '../../../entities/whatsapp/SendMidea'

export class WhatsAppWebSendMidea implements EngineSendMidea {
  
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly validPhone: ValidPhone,
    private readonly parsePhone: ParsePhone){}

  async sendMidea(params: SendMidea.Params): Promise<SendMidea.Result> {
    
    const response: SendMidea.Result = { success: false }
    
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