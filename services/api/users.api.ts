import { User, UsersDl } from '../dat/users.dl';

export class UsersApi {
  static async findUser(username: string, password: string): Promise<User| null> {
    const userDl = new UsersDl();

    return userDl.findOne(username, password);
  }
}