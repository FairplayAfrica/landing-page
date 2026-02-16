import { Job, CreateJobDTO, UpdateJobDTO } from "../entities/job";

/**
 * Repository Interface (Port)
 * Defines the contract for job data persistence.
 * Infrastructure layer provides the concrete implementation.
 */
export interface IJobRepository {
  findAll(): Promise<Job[]>;
  findActive(): Promise<Job[]>;
  findById(id: string): Promise<Job | null>;
  create(data: CreateJobDTO): Promise<Job>;
  update(id: string, data: UpdateJobDTO): Promise<Job | null>;
  delete(id: string): Promise<boolean>;
}
