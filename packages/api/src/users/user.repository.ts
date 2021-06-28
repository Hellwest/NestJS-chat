import { ConflictException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SignUpInput } from "../auth/types/sign-up.input"
import { User } from "./user.schema"

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) readonly userModel: Model<User>) {}

  async createUser(input: SignUpInput): Promise<User> {
    const { login, password } = input

    const existingUser = await this.userModel.findOne({ login })

    if (existingUser) {
      throw new ConflictException("api.userExists")
    }

    const user = new this.userModel()
    user.login = login
    user.password = password

    return await user.save()
  }
}
