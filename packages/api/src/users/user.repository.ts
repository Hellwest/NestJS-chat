import { ConflictException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { SignUpInput } from "../auth/types/sign-up.input"
import { User } from "./user.schema"

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) readonly userModel: Model<User>) {}

  async createUser(input: SignUpInput, passwordHash: string): Promise<User> {
    const { login } = input

    const user = new this.userModel()
    user.login = login
    user.password = passwordHash

    return await user.save()
  }
}
