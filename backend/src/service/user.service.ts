import { Provide, Inject } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/orm';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userRepository: Repository<User>;

  @Inject()
  jwtService: JwtService;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getUserInfo() {
    //从token中获取用户信息

    
  }

  async validateUser(username: string, password: string): Promise<{id,username,token}> {
    const user = await this.userRepository.findOne({
      where: { username, password }
    });

    if (user) {
      // If the user is valid, generate a JWT token
      const token = this.jwtService.signSync({ id: user.id, username: user.username });
      return {id: user.id, username: user.username, token};
    }else{
      //create a new user
      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      await this.userRepository.save(newUser);
      const token = this.jwtService.signSync({ id: newUser.id, username: newUser.username });
      return {id: newUser.id, username: newUser.username, token};
    }
  }
}
