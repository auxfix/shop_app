import { Role } from "~/context/AuthContext";

export interface User  {
  id: number;
  username: string;
  password: string;
  role: Role;
  email: string;
}

export class UsersDl {

    private users: User[];

    constructor() {
      this.users = [
        {
          id: 1,
          username: "john_doe",
          password: "password123",
          role: 'user',
          email: "john@example.com"
        },
        {
          id: 2,
          username: "jane_smith",
          password: "qwerty456",
          role: 'user',
          email: "jane@example.com"
        },
        {
          id: 3,
          username: "alice_green",
          password: "alicePass789",
          role: 'admin',
          email: "alice@example.com"
        }
      ];
    }

    async findAll(): Promise<User[]> {
      return this.users.slice(); 
    }
    
    async findOne(username: string, password: string): Promise<User | null> {
      return this.users.filter(usr => (usr.username === username) && (usr.password === password))[0];
    }    
}

export const userDl = new UsersDl();