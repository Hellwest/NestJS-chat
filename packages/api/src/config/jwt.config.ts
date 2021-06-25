import config = require("config")

interface JwtConfig {
  secret: string
}

const configFromFile = config.get<JwtConfig>("jwt")

export const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || configFromFile.secret,
}
