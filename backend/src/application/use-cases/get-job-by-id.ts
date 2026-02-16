import { IJobRepository } from "../../domain/repositories/job-repository.interface";
import { Job } from "../../domain/entities/job";

export class GetJobByIdUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(id: string): Promise<Job | null> {
    return this.jobRepo.findById(id);
  }
}
