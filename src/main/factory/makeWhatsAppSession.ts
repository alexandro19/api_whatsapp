import { SessionUseCase } from '../../usecases/whatsapp/SessionUseCase'
import { SessionController } from '../../aplication/controllers/whatsapp/SessionController'
import { Controller } from '../../aplication/interfaces/Controller'
import { SessionMemory } from '../../infra/session/sessionMemory/SessionMemory'

export const makeSessionController = (): Controller => {
  const sessionRepository = new SessionMemory()
  const session           = new SessionUseCase(sessionRepository)
  return new SessionController(session)
}