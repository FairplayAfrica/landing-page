import { IJobRepository } from "../../domain/repositories/job-repository.interface";

export class DeleteJobUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.jobRepo.delete(id);
  }
}
