import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => jwt.sign(payload, secret, { expiresIn: expireTime })

const verifyToken = (token: string, secret: Secret): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload

export const jwtHelpers = {
  createToken,
  verifyToken,
}
