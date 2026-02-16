import { IJobRepository } from "../../domain/repositories/job-repository.interface";
import { Job } from "../../domain/entities/job";

export class ToggleJobStatusUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(id: string): Promise<Job | null> {
    const job = await this.jobRepo.findById(id);
    if (!job) return null;
    return this.jobRepo.update(id, { isActive: !job.isActive });
  }
}
