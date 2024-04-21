import { Role } from "~/context/AuthContext";

export interface User  {
  id: number;
  username: string;
  name: string;
  secondName: string;
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
          name: 'John',
          secondName: 'Doe',
          password: "password123",
          role: 'user',
          email: "john@example.com"
        },
        {
          id: 2,
          username: "jane_smith",
          password: "qwerty456",
          name: 'Jane',
          secondName: 'Smith',
          role: 'user',
          email: "jane@example.com"
        },
        {
          id: 3,
          username: "alice_green",
          password: "alicePass789",
          name: 'Alice',
          secondName: 'Green',
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