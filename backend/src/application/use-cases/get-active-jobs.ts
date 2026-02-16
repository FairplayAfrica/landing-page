import { IJobRepository } from "../../domain/repositories/job-repository.interface";
import { Job } from "../../domain/entities/job";

export class GetActiveJobsUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(): Promise<Job[]> {
    return this.jobRepo.findActive();
  }
}
