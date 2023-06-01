import { unlink } from 'fs'
import { SendMessage } from '../../../entities/whatsapp/SendMessage'
import { EngineSendMessage, ParsePhone, SessionRepository, ValidPhone } from '../../../usecases/interfaces'

export class VenomBotSendMessage implements EngineSendMessage {

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

    try {
     
      let profile = await engine.client.checkNumberStatus(phoneNumber)

      if(profile.numberExists){
        console.log(`Numero ${profile.id._serialized}`)
        phoneNumber = profile.id._serialized
      }

      await engine.client.sendText(phoneNumber, params.message)
      
      for(const file of params.files){
        await engine.client.sendFile(phoneNumber, file, 'File', '')
        
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
      console.log(error)
      response.error = error
      return response
    }
  }
}