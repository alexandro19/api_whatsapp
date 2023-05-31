import { SessionRepository } from '../../../usecases/interfaces/SessionRepository'
import Sessions from './Sessions'

export class SessionMemory implements SessionRepository {
  
  async addClientSession(session: string, client: any): Promise<boolean> {
    return await Sessions.addInfoSession(session, {client: client}) 
  }

  async addConnectedSession(session: string): Promise<boolean> {
    return await Sessions.addInfoSession(session, { connected: true }) 
  }

  async addPhoneSession(session: string, phone: string): Promise<boolean> {
    return await Sessions.addInfoSession(session, { phone: phone })    
  }

  async addQrCodeSession(session: string, qrCode: string): Promise<boolean> {
    return await Sessions.addInfoSession(session, { qrCode: qrCode })  
  }

  async addSession(session: string): Promise<boolean> {
    return await Sessions.checkAddUser(session)
  }

  async existsSession(session: string): Promise<boolean> {
    const result = Sessions.checkSession(session)
    return await Sessions.checkSession(session)
  }

  async existsSessionByPhone(phone: string): Promise<boolean> {
    return await Sessions.checkSessionPhone(phone)
  }

  async getSession(session: string): Promise<any> {
    return await Sessions.getSession(session)
  }

  async deleteSession(session: string): Promise<boolean> {
    return await Sessions.deleteSession(session)  
  }

  async getSessionPhone(phone: string): Promise<any> {
    return await Sessions.getSessionPhone(phone)  
  }
}