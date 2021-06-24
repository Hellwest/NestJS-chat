import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { graphQLConfig } from "./config/graphql.config"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [GraphQLModule.forRoot(graphQLConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
