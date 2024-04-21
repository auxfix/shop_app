import { User, UsersDl } from "../data/users.dl";

export class UsersApi {
  constructor(private usersDl: UsersDl) {}

  async findUser(username: string, password: string): Promise<User | null> {
    return this.usersDl.findOne(username, password);
  }
}