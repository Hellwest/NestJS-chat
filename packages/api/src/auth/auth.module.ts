import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"

import { jwtConfig } from "../config/jwt.config"
import { UserRepository } from "../users/user.repository"
import { UsersModule } from "../users/users.module"
import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, UserRepository],
})
export class AuthModule {}
