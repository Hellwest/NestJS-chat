export interface JwtPayload {
  login: string
  sub: string
  iat: number
  exp: number
}
