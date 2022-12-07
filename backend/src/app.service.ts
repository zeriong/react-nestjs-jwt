import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private users: User[];

  getHello(): string {
    return 'Hello World!';
  }

  create(userData: CreateUserDTO) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }
}
