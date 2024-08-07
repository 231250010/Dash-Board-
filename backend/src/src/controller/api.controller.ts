import { Inject, Controller, Get, Query,Post,Body } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {

  @Inject()
  private userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(@Body() loginInfo: { username: string; password: string }) {
    const isValidUser = await this.userService.validateUser(loginInfo.username, loginInfo.password);
    if (isValidUser) {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  }
}
