import { Inject, Controller, Get, Query,Post,Body } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';

@Controller('/api')
export class APIController {

  @Inject()
  private userService: UserService;

  @Inject()
  private projectService: ProjectService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(@Body() loginInfo: { username: string; password: string }) {
  const token = await this.userService.validateUser(loginInfo.username, loginInfo.password);
  if (token) {
    return { success: true, token };
  } else {
      return { success: false, message: 'Invalid username or password' };
    }
  }

  @Post('/createProject')
  async createProject(@Body() body: { name: string; description: string; ownerId: number }) {
    const { name, description, ownerId } = body;
    return await this.projectService.createProject(name, description, ownerId);
  }

  @Get('/getProjectsByOwner')
  async getProjectsByOwner(@Query('ownerId') ownerId) {
    return await this.projectService.getProjectsByOwner(ownerId);
  }
}
