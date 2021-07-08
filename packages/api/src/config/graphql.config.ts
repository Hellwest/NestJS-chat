import config = require("config")
import depthLimit from "graphql-depth-limit"
import { DateScalarMode, GqlModuleOptions } from "@nestjs/graphql"
import { getBoolean } from "./get-boolean"

interface GQLConfig {
  debug: boolean
  playground: boolean
  introspection: boolean
  autoSchemaFile: string | boolean
  dateScalarMode: DateScalarMode
  depthLimit: number
}

const configFromFile = config.get<GQLConfig>("graphql")

export const graphQLConfig: GqlModuleOptions = {
  validationRules: [
    depthLimit(
      Number(process.env.GRAPHQL_DEPTH_LIMIT) || configFromFile.depthLimit,
    ),
  ],
  debug: getBoolean(process.env.GRAPHQL_DEBUG, configFromFile.debug),
  playground: getBoolean(
    process.env.GRAPHQL_PLAYGROUND,
    configFromFile.playground,
  ),
  introspection: getBoolean(
    process.env.GRAPHQL_INTROSPECTION,
    configFromFile.introspection,
  ),
  autoSchemaFile:
    process.env.GRAPHQL_AUTH_SCHEMA_FILE || configFromFile.autoSchemaFile,
  buildSchemaOptions: {
    dateScalarMode:
      (process.env.GRAPHQL_DATE_SCALAR_MODE as DateScalarMode) ||
      configFromFile.dateScalarMode,
  },
  installSubscriptionHandlers: true,
  context: ({ req, connection }: any): Record<string, unknown> => ({
    req,
    connection,
  }),
}
