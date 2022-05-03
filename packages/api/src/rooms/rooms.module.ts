import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { RoomRepository } from "./room.repository"
import { Room, RoomSchema } from "./room.schema"
import { RoomsResolver } from "./rooms.resolver"
import { RoomsService } from "./rooms.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomsResolver, RoomsService, RoomRepository],
  exports: [RoomsService],
})
export class RoomsModule {}
