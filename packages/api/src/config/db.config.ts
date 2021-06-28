import config = require("config")

interface DBConfig {
  uri: string
}

const configFromFile = config.get<DBConfig>("db")

export const dbConfig: DBConfig = {
  uri: process.env.DB_CONNECTION_URI || configFromFile.uri,
}
