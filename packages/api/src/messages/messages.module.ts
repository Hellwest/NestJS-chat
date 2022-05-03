import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { RedisPubSub } from "graphql-redis-subscriptions"
import Redis from "ioredis"

import { redisConfig } from "../config/redis.config"
import { RoomsModule } from "../rooms/rooms.module"
import { dateReviver } from "../shared/date-reviver/date-reviver"
import { MessageRepository } from "./message.repository"
import { Message, MessageSchema } from "./message.schema"
import { MessagesResolver } from "./messages.resolver"
import { MessagesService } from "./messages.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RoomsModule,
  ],
  providers: [
    MessagesResolver,
    MessagesService,
    MessageRepository,
    {
      provide: "PUB_SUB",
      useValue: new RedisPubSub({
        reviver: dateReviver,
        publisher: new Redis(redisConfig),
        subscriber: new Redis(redisConfig),
      }),
    },
  ],
})
export class MessagesModule {}
