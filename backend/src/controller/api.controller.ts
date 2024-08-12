import { Inject, Controller, Get, Query,Post,Body, Put, Param } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { TaskService } from '../service/task.service';


@Controller('/api')
export class APIController {

  @Inject()
  private userService: UserService;

  @Inject()
  private projectService: ProjectService;

  @Inject()
  private TaskService: TaskService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/getUserInfo')
  async getUserInfo() {
    return await this.userService.getUserInfo();
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

  @Post('/createTask')
  async createTask(@Body() body: { name: string; description: string; ownerId: number;projectId: number;content:string; status:string;attachments?: { name: string, url: string }[];
  comments?: { user: string, comment: string, date: Date }[]}) {
    const { name, description, ownerId, projectId, content, status, attachments, comments } = body;
    return await this.TaskService.createTask(name, description, ownerId, projectId, content, status, attachments, comments);
  }

  @Get('/getTasksByProject')
  async getTasksByProject(@Query('projectId') projectId) {
    return await this.TaskService.getTasksByProject(projectId);
  }

  @Get('/getTaskById')
  async getTaskById(@Query('id') id) {
    return await this.TaskService.getTaskById(id);
  }

  @Put('/updateTask/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() body: { name: string; description: string; content: string; status: string }
  ) {
    const { name, description, content, status } = body;
    return await this.TaskService.updateTask(id, name, description, content, status);
  }
}
