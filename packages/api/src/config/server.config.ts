import config = require("config")

export interface ServerConfig {
  port: number
}

const configFromFile = config.get<ServerConfig>("server")

export const serverConfig: ServerConfig = {
  port: Number(process.env.SERVER_PORT) || configFromFile.port,
}
