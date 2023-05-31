export interface EngineAuthentication {
  authentication(session: string): Promise<boolean>      
}