import { IJobRepository } from "../../domain/repositories/job-repository.interface";
import { Job, CreateJobDTO } from "../../domain/entities/job";

export class CreateJobUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(data: CreateJobDTO): Promise<Job> {
    return this.jobRepo.create(data);
  }
}
