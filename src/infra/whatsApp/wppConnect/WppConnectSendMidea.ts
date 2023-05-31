import { unlink } from "fs"
import { SendMidea } from "../../../entities/whatsapp/SendMidea"
import { EngineSendMidea, ParsePhone, SessionRepository, ValidPhone } from "../../../usecases/interfaces"

export class WppConnectSendMidea implements EngineSendMidea {
  
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

    try {
     
      let profile = await engine.client.checkNumberStatus(phoneNumber)

      if(profile.numberExists){
        phoneNumber = profile.id._serialized
      }
 
      for(const file of params.files){
        await engine.client.sendFile(phoneNumber, file)
        
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