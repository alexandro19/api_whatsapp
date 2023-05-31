import { SessionRepository } from '../interfaces/SessionRepository'
import { Session } from '../../entities/whatsapp/Session'

export class SessionUseCase implements Session {
  
  constructor(private readonly sessionRepository: SessionRepository){}

  fetch(params: Session.Params): Promise<Session.Result> {
    const result = this.sessionRepository.getSession(params.session)
    return Promise.resolve(result)
  }
}