import { Provide} from '@midwayjs/core';
import { IUserOptions } from '../interface';
// import { Inject } from '@midwayjs/decorator';

import { Repository } from 'typeorm';
import { User } from '../entity/user';
// import { UserRepository } from '../repository/user.repository';
import { InjectEntityModel } from '@midwayjs/orm';


@Provide()
export class UserService {

  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  
  

  async validateUser(username: string, password: string): Promise<boolean> {
    if (!this.userRepository) {
      throw new Error('UserRepository is not initialized');
    }

    const user = await this.userRepository.findOne({
      where: { username, password}
    });
    return !!user;
  }
}
