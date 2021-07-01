import { UseGuards } from "@nestjs/common"
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"
import { GqlAuthGuard } from "../auth/auth.guard"
import { RoomsService } from "./rooms.service"
import { CreateRoomInput } from "./types/create-room.input"
import { CreateRoomPayload } from "./types/create-room.payload"
import { EditRoomInput } from "./types/edit-room.input"
import { EditRoomPayload } from "./types/edit-room.payload"
import { RoomType } from "./types/room.type"

@Resolver("Rooms")
@UseGuards(GqlAuthGuard)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query((): [typeof RoomType] => [RoomType], {
    name: "getRooms",
    description: "Get a list of rooms",
  })
  async getRooms(): Promise<RoomType[]> {
    return await this.roomsService.getRooms()
  }

  @Query((): typeof RoomType => RoomType, {
    name: "getRoom",
    description: "Get room info",
    nullable: true,
  })
  async getRoom(
    @Args({ name: "id", type: (): GraphQLScalarType => ID }) id: string,
  ): Promise<RoomType> {
    return await this.roomsService.getRoom(id)
  }

  @Mutation((): typeof CreateRoomPayload => CreateRoomPayload, {
    name: "createRoom",
    description: "Create a chat room",
  })
  async createRoom(
    @Args("input") input: CreateRoomInput,
  ): Promise<CreateRoomPayload> {
    return await this.roomsService.createRoom(input)
  }

  @Mutation((): typeof EditRoomPayload => EditRoomPayload, {
    name: "editRoom",
    description: "Edit a chat room",
  })
  async editRoom(
    @Args("input") input: EditRoomInput,
  ): Promise<EditRoomPayload> {
    return await this.roomsService.editRoom(input)
  }

  @Mutation((): typeof RoomType => RoomType, {
    name: "deleteRoom",
    description: "Delete a chat room",
  })
  async deleteRoom(
    @Args({ name: "id", type: (): GraphQLScalarType => ID }) id: string,
  ): Promise<RoomType> {
    return await this.roomsService.deleteRoom(id)
  }
}
