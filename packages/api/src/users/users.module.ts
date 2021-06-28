import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserRepository } from "./user.repository"
import { User, UserSchema } from "./user.schema"
import { UsersResolver } from "./users.resolver"
import { UsersService } from "./users.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, UserRepository],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
