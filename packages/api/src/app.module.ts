import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"

import { AppController } from "./app.controller"
import { graphQLConfig } from "./config/graphql.config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { MongooseModule } from "@nestjs/mongoose"
import { dbConfig } from "./config/db.config"

@Module({
  imports: [
    GraphQLModule.forRoot(graphQLConfig),
    MongooseModule.forRoot(dbConfig.uri),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
