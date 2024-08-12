import { Provide } from "@midwayjs/core";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Task } from "../entity/task";
import { Project } from "../entity/project";

@Provide()
export class TaskService {
  @InjectEntityModel(Task)
  taskRepository: Repository<Task>;

  @InjectEntityModel(Project)
    projectRepository: Repository<Project>;
  

    async createTask(
      name: string,
      description: string,
      ownerId: number,
      projectId: number,
      content: string,
      status: string,
      attachments?: { name: string, url: string }[],
      comments?: { user: string, comment: string, date: Date }[]
    ): Promise<Task> {
      const newTask = new Task();
      newTask.name = name;
      newTask.description = description;
      newTask.content = content;
      newTask.status = status;
      newTask.ownerId = ownerId || await this.projectRepository.findOne({ where: { id: projectId } }).then(res => res.ownerId);
      newTask.projectId = projectId;
    
      if (attachments) newTask.attachments = attachments;
      if (comments) newTask.comments = comments;
    
      return await this.taskRepository.save(newTask);
    }
    

  async getTaskById(id: number) {
    return await this.taskRepository.find({where:{id}});
}

  async getTasksByProject(projectId: number) {
    return await this.taskRepository.find({
      where: { projectId },
    });
  }

    async updateTask(id: number, name: string, description: string, content: string, status: string) {
    const task = await this.taskRepository.find(
        {where:{name,description}}
    );
    var updated = task[0];
    updated.name = name;
    updated.description = description;
    updated.content = content;
    updated.status = status;
    return await this.taskRepository.save(updated);
    }
}