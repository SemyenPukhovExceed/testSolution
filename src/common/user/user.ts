export class User {
  constructor(public email: string, public password: string) {}

  public equals(user: User): boolean {
    return this.email === user.email && this.password === user.password;
  }
  
}
