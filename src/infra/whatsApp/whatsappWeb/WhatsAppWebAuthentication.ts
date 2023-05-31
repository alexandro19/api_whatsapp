import { Client, LocalAuth } from 'whatsapp-web.js'
import { SessionRepository, QrCodeTerminal, EngineAuthentication } from '../../../usecases/interfaces'
import { Socket } from '../../../usecases/interfaces/Socket'
import { QrCodeBase64 } from 'usecases/interfaces/QrCodeBase64'

export class WhatsAppWebAuthentication implements EngineAuthentication {
  
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly qrCodeTerminal: QrCodeTerminal,
    private readonly socket: Socket,
    private readonly qrCodeBase64: QrCodeBase64){}

  async authentication(session: string): Promise<boolean> {
    
    if(!await this.sessionRepository.existsSession(session)){
      this.sessionRepository.addSession(session)
    }

    const client = new Client({
      authStrategy: new LocalAuth({ clientId: session }),
      takeoverOnConflict: true,
      puppeteer: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ],
        headless: true,
      } 
    })

    client.on('auth_failure', msg => {
      console.error('AUTHENTICATION FAILURE', msg)
    })

    client.on('qr', async (qrCode) => {
      this.sessionRepository.addQrCodeSession(session, qrCode)
      this.qrCodeTerminal.generate(qrCode)

      var imgData = await this.qrCodeBase64.draw(qrCode, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 500
      })

      this.socket.emit('qrCode', {
        session: session,
        qrCode: imgData        
      })
    })

    client.on('authenticated', () => {    
      this.sessionRepository.addConnectedSession(session)
      this.sessionRepository.addClientSession(session, client)

      this.socket.emit('connected', {
        session: session,
        connected: true
      })

    })

    client.on('disconnected', () => {
      if(client.info.wid.user){
        const data:any = this.sessionRepository.getSessionPhone(client.info.wid.user)
        if(data){
          this.sessionRepository.deleteSession(data.session)
        }
        this.socket.emit('close', {
          session: data.session
        })
      }
    })

    client.on('ready', () => {
      console.log('Client is ready') 
      this.sessionRepository.addPhoneSession(session, client.info.wid.user)
    })

    client.on('message', msg => {
      if(msg.body == '!ping')
        msg.reply('pong')  
    })
    
    try {
      await client.initialize()    
      return true
    } 
    catch (error) {
      return false  
    }
  }
}