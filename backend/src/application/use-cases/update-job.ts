import { IJobRepository } from "../../domain/repositories/job-repository.interface";
import { Job, UpdateJobDTO } from "../../domain/entities/job";

export class UpdateJobUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(id: string, data: UpdateJobDTO): Promise<Job | null> {
    return this.jobRepo.update(id, data);
  }
}
