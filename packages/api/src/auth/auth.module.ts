import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module"
import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
