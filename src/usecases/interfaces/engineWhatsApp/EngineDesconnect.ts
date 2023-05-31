import { Desconnect } from '../../../entities/whatsapp/Desconnect'

export interface EngineDesconnect {
  desconnect(params: Desconnect.params): Promise<Desconnect.Result>
}