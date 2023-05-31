export interface SessionRepository {

  addSession(session: string): Promise<boolean>

  existsSession(session: string): Promise<boolean> 

  existsSessionByPhone(phone: string): Promise<boolean>

  addQrCodeSession(session: string, qrCode: string): Promise<boolean>

  addConnectedSession(session: string): Promise<boolean>

  addClientSession(session: string, client: any): Promise<boolean>

  addPhoneSession(session: string, phone: string): Promise<boolean>

  getSession(session: string): Promise<any>
  
  getSessionPhone(phone: string): Promise<any>

  deleteSession(session: string): Promise<boolean>

}