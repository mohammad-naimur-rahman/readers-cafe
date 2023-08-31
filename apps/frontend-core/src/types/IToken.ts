export interface IToken {
  exp: number
  iat: number
  role: 'user' | 'admin'
  userId: string
  TokenVersion: number
}
