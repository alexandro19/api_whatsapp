import { create, Whatsapp } from 'venom-bot'
import { EngineAuthentication, SessionRepository, Socket } from '../../../usecases/interfaces'

export class VenomBotAuthentication implements EngineAuthentication {

  constructor(
    private readonly socket: Socket,
    private readonly sessionRepository: SessionRepository){} 

  async authentication(session: string): Promise<boolean> {
     
    if(!await this.sessionRepository.existsSession(session)){
      this.sessionRepository.addSession(session)
    }

    await create(
      session,
      (base64Qrimg) => {
        this.sessionRepository.addQrCodeSession(session, base64Qrimg)
        this.socket.emit('qrCode', {
          session: session,
          qrCode: base64Qrimg        
        })
      },
      async (statusSession, session) => {
        console.log(statusSession)
        
        if (statusSession === 'browserClose' ||
            statusSession === 'qrReadFail' ||
            statusSession === 'autocloseCalled' ||
            statusSession === 'serverClose') {
              
            const data:any = await this.sessionRepository.getSession(session)

            if(data){
              this.sessionRepository.deleteSession(data.session)
            }
            
            this.socket.emit('close', {
              session: session
            })                      
        }
        if (statusSession === 'isLogged' ||
            statusSession === 'qrReadSuccess' ||
            statusSession === 'chatsAvailable' ||
            statusSession === 'inChat') {
            
            this.sessionRepository.addConnectedSession(session)
            
            this.socket.emit('connected', {
              session: session,
              connected: true
            })
        }
      },
      {
        headless: true,
        logQR: true,
        browserWS: '',
        updatesLog: true,
        autoClose: 90000,
        disableSpins: false,
        browserArgs: [
            '--log-level=3',
            '--no-default-browser-check',
            '--disable-site-isolation-trials',
            '--no-experiments',
            '--ignore-gpu-blacklist',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-default-apps',
            '--enable-features=NetworkService',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            // Extras
            '--disable-webgl',
            '--disable-threaded-animation',
            '--disable-threaded-scrolling',
            '--disable-in-process-stack-traces',
            '--disable-histogram-customizer',
            '--disable-gl-extensions',
            '--disable-composited-antialiasing',
            '--disable-canvas-aa',
            '--disable-3d-apis',
            '--disable-accelerated-2d-canvas',
            '--disable-accelerated-jpeg-decoding',
            '--disable-accelerated-mjpeg-decode',
            '--disable-app-list-dismiss-on-blur',
            '--disable-accelerated-video-decode',
        ],
        createPathFileToken: false,
      },
    )
    .then( async (client: Whatsapp) => {
      
      const phone: any = await client.getHostDevice()
      
      this.sessionRepository.addPhoneSession(session, phone.id._serialized.replace('@c.us', ''))
      this.sessionRepository.addClientSession(session, client)

      client.onMessage((message) => {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
          client
            .sendText(message.from, 'Welcome Venom 🕷')
            .then((result) => {
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
        }
      })
    })
    .catch((erro) => {
      console.log(erro)
    })

    return true
  }
}