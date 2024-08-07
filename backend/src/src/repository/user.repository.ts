// src/repository/user.repository.ts
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { Provide } from '@midwayjs/core';

@Provide()
export class UserRepository extends Repository<User> {
  // 可以在这里定义额外的方法，方便进行数据库操作
  async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    return this.findOne({
      where: { username, password }
    });
  }
}
