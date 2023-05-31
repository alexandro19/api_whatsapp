import { SendMidea } from "../../../entities/whatsapp/SendMidea"

export interface EngineSendMidea {
  sendMidea(params: SendMidea.Params): Promise<SendMidea.Result>    
}