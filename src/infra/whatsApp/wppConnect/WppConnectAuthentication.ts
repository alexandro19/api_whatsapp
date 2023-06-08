import { Socket } from '../../../usecases/interfaces/Socket'
import { EngineAuthentication, SessionRepository } from '../../../usecases/interfaces'
import { create, Whatsapp } from '@wppconnect-team/wppconnect' 

export class WppConnectAuthentication implements EngineAuthentication {
  
  constructor(
    private readonly socket: Socket,
    private readonly sessionRepository: SessionRepository){}

  async authentication(session: string): Promise<boolean> {
    
    if(!await this.sessionRepository.existsSession(session)){
      this.sessionRepository.addSession(session)
    }

    try {
      await create({
        session: session,
        catchQR: (base64Qrimg) => {
          this.sessionRepository.addQrCodeSession(session, base64Qrimg)
          this.socket.emit('qrCode', {
            session: session,
            qrCode: base64Qrimg        
          })  
        },
        statusFind: async (statusSession, session) => {
          if (statusSession === 'browserClose' || statusSession === 'qrReadFail' || statusSession === 'autocloseCalled' || statusSession === 'serverClose') {
            const data:any = await this.sessionRepository.getSession(session)

            if(data){
              this.sessionRepository.deleteSession(data.session)
            }
            
            this.socket.emit('close', {
              session: session
            })                      
          }
          else if (statusSession === 'inChat') {
            this.sessionRepository.addConnectedSession(session)
            this.socket.emit('connected', {
              session: session,
              connected: true
            }) 
          }
        },
        onLoadingScreen: (percent, message) => {
          console.log('LOADING_SCREEN', percent, message);
        },
        headless: true, // Headless chrome
        devtools: false, // Open devtools by default
        useChrome: true, // If false will use Chromium instance
        debug: false, // Opens a debug session
        logQR: true, // Logs QR automatically in terminal
        browserWS: '', // If u want to use browserWSEndpoint
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
        ], // Parameters to be added into the chrome browser instance
        puppeteerOptions: {}, // Will be passed to puppeteer.launch
        disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
        updatesLog: false, // Logs info updates automatically in terminal
        autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
        tokenStore: 'file', // Define how work with tokens, that can be a custom interface
        folderNameToken: './tokens', //folder name when saving tokens
        
      })
      .then(async (client: Whatsapp) => {
        const phone = await client.getWid()
        this.sessionRepository.addPhoneSession(session, phone.replace('@c.us', ''))
        this.sessionRepository.addClientSession(session, client)
        
        client.onMessage((message) => {
          console.log('Mensagem recebida')
          console.log(message)
          
          if(message.body === 'gostaria de saber mais sobre o produto'){
            client
              .sendText(message.from, `Olá, ${message.notifyName}, vou te explicar certinho como funciona o 
              produto e quais as vantagens que você vai poder usufruir dele, já salva o meu contato ai para 
              irmos conversando`)
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });  
          }

          if(message.body.includes('valor')){
            client
              .sendText(message.from, `Então esse produto está com um preço muito especial essa semana, está com uma promoção no kit vc gostaria de saber mais sobre esse kit promicional?`)
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });  
          }

          if (message.body === 'Hello') {
            client
              .sendText(message.from, 'Hello, how I may help you?')
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
          }
        });
      })
      .catch((error) => console.log(error))
  
      return true  
    } 
    catch (error) {
      return false  
    }
  }
}