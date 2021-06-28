import { Injectable, NotFoundException } from "@nestjs/common"
import * as bcryptjs from "bcryptjs"

import { User, UsersService } from "../users/users.service"
import { AuthType } from "./types/auth.type"
import { SignInInput } from "./types/sign-in.input"
import { SignInPayload } from "./types/sign-in.payload"

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async me(user: User): Promise<AuthType> {
    return new AuthType(user)
  }

  async signIn(input: SignInInput): Promise<SignInPayload> {
    const { login, password } = input

    const user = await this.usersService.getUserByLogin(login)

    if (!user) {
      throw new NotFoundException()
    }

    await this.comparePasswords(password, user.password)

    return { token: "token", me: new AuthType(user) }
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.getUserById(id)

    if (!user) {
      return null
    }

    const { password, ...result } = user

    return result
  }

  private async comparePasswords(
    pass: string,
    userPass: string,
  ): Promise<boolean> {
    const isEqual = await bcryptjs.compare(pass, userPass)

    if (!isEqual) {
      throw new NotFoundException()
    }

    return true
  }
}
