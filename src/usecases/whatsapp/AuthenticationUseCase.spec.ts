import { AuthenticationUseCase } from './AuthenticationUseCase'
import { Authentication } from '../../entities/whatsapp/Authentication'
import { EngineAuthentication } from '../interfaces/engineWhatsApp'

const mockEngineWhatsApp = (): EngineAuthentication => {
  class FakeEngineWhatsApp implements EngineAuthentication {
    authentication(session: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new FakeEngineWhatsApp()
}

type TypeMock = {
  fakeEngineWhatsApp: EngineAuthentication,
  authenticationUseCase: AuthenticationUseCase    
}

const mockAuthenticationUseCase = (): TypeMock => {
  const fakeEngineWhatsApp = mockEngineWhatsApp()
  const authenticationUseCase = new AuthenticationUseCase(fakeEngineWhatsApp)
  return {
    fakeEngineWhatsApp, 
    authenticationUseCase 
  }   
}

describe('Authentication UseCase', () => {
  test('Deve chamar Engine WhatsApp com o paramentro correto', async () => {
    
    const { authenticationUseCase, fakeEngineWhatsApp } = mockAuthenticationUseCase() 
    
    const spy = jest.spyOn(fakeEngineWhatsApp, 'authentication')

    const fakeSession = 'any_session'
    
    const fakeParam: Authentication.Params = {
      session: fakeSession
    }

    await authenticationUseCase.auth(fakeParam)
    expect(spy).toHaveBeenCalledWith(fakeSession)
  })

  test('Deve retornar true caso o Engine WhatsApp tenha autenticado', async () => {
    
    const { authenticationUseCase } = mockAuthenticationUseCase() 
    
    const fakeSession = 'any_session'
    
    const fakeParam: Authentication.Params = {
      session: fakeSession
    }

    const result = await authenticationUseCase.auth(fakeParam)
    expect(result.authenticated).toBe(true)
  })
})