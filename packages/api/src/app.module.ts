import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"

import { AppController } from "./app.controller"
import { graphQLConfig } from "./config/graphql.config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { dbConfig } from "./config/db.config"
import { RoomsModule } from "./rooms/rooms.module"
import { MessagesModule } from "./messages/messages.module"
import { SharedModule } from "./shared/shared.module"

@Module({
  imports: [
    GraphQLModule.forRoot(graphQLConfig),
    MongooseModule.forRoot(dbConfig.uri),
    AuthModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
    SharedModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
