import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "src/config/jwt.config"
import { User } from "../users/users.service"
import { AuthService } from "./auth.service"
import { JwtPayload } from "./jwt-payload.interface"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { sub } = payload

    const user = await this.authService.validateUser(sub)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
