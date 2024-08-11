import { Repository } from "typeorm";
import { Project } from "../entity/project";
import { Provide } from "@midwayjs/core";

@Provide()
export class ProjectRepository extends Repository<Project> {
  async findByUserId(ownerId: number): Promise<Project[]> {
    return this.find({
      where: { ownerId }
    });
  }
}