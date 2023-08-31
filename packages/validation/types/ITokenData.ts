export interface ITokenData {
  iat: number
  exp: number
  role: 'user' | 'admin'
  userId: string
  tokenVersion: number
}
