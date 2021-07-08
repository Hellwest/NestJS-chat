import config = require("config")

interface RedisConfig {
  host: string
  port: number
}

const configFromFile = config.get<RedisConfig>("redis")

export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST || configFromFile.host,
  port: Number(process.env.REDIS_PORT) || configFromFile.port,
}
