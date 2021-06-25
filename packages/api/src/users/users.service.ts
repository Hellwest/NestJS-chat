import { Injectable } from "@nestjs/common"

export type User = any

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: "id1",
      login: "John",
      password: "stdpassword1",
    },
    {
      id: "id2",
      login: "Jane",
      password: "stdpawwsord2",
    },
  ]

  async getUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }

  async getUserByLogin(login: string): Promise<User> {
    return this.users.find((user) => user.login === login)
  }
}
