import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"

import { UserRepository } from "../users/user.repository"
import { User } from "../users/user.schema"
import { AuthType } from "./types/auth.type"
import { SignInInput } from "./types/sign-in.input"
import { SignInPayload } from "./types/sign-in.payload"
import { SignUpInput } from "./types/sign-up.input"
import { SignUpPayload } from "./types/sign-up.payload"

const INVALID_CREDENTIALS_ERROR_MESSAGE = "api.invalidCredentials"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async me(user: User): Promise<AuthType> {
    return new AuthType(user)
  }

  async signUp(input: SignUpInput): Promise<SignUpPayload> {
    const { login, password } = input

    const [existingUser, hash] = await Promise.all([
      this.userRepository.userModel.findOne({ login }),
      bcrypt.hash(password, bcrypt.genSaltSync()),
    ])

    if (existingUser) {
      throw new ConflictException("api.userExists")
    }

    const user = await this.userRepository.createUser(input, hash)

    const payload = new SignUpPayload()
    payload.recordId = user.id
    payload.record = new AuthType(user)

    return payload
  }

  async signIn(input: SignInInput): Promise<SignInPayload> {
    const { login, password } = input

    const user = await this.userRepository.userModel.findOne({ login })

    if (!user) {
      throw new NotFoundException(INVALID_CREDENTIALS_ERROR_MESSAGE)
    }

    await this.comparePasswords(password, user.password)

    return this.createSignInPayload(new AuthType(user))
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userRepository.userModel.findById(id)

    if (!user) {
      return null
    }

    return user
  }

  private async comparePasswords(
    pass: string,
    userPass: string,
  ): Promise<boolean> {
    const isEqual = await bcrypt.compare(pass, userPass)

    if (!isEqual) {
      throw new NotFoundException(INVALID_CREDENTIALS_ERROR_MESSAGE)
    }

    return true
  }

  private createSignInPayload(auth: AuthType): SignInPayload {
    const payload = {
      login: auth.login,
      sub: auth.id,
    }

    const token = this.jwtService.sign(payload)

    return new SignInPayload({ token, me: auth })
  }
}
