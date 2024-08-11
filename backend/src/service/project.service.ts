import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Project } from '../entity/project';

@Provide()
export class ProjectService {

  @InjectEntityModel(Project)
  projectRepository: Repository<Project>;

  async createProject(name: string, description: string, ownerId: number): Promise<Project> {
    const newProject = new Project();
    newProject.name = name;
    newProject.description = description;
    newProject.ownerId = ownerId;

    return await this.projectRepository.save(newProject);
  }

  async getProjectsByOwner(ownerId: number) {
    return await this.projectRepository.find({
      where: { ownerId },
    });
  }
}
