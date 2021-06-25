import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"

import { AppController } from "./app.controller"
import { graphQLConfig } from "./config/graphql.config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [GraphQLModule.forRoot(graphQLConfig), AuthModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
