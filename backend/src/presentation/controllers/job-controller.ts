import { Request, Response } from "express";
import {
  GetAllJobsUseCase,
  GetActiveJobsUseCase,
  GetJobByIdUseCase,
  CreateJobUseCase,
  UpdateJobUseCase,
  DeleteJobUseCase,
  ToggleJobStatusUseCase,
} from "../../application";
import { createJobSchema, updateJobSchema } from "../validation/job-schemas";
import { AppError } from "../middleware/error-handler";

export class JobController {
  constructor(
    private readonly getAllJobs: GetAllJobsUseCase,
    private readonly getActiveJobs: GetActiveJobsUseCase,
    private readonly getJobById: GetJobByIdUseCase,
    private readonly createJob: CreateJobUseCase,
    private readonly updateJob: UpdateJobUseCase,
    private readonly deleteJob: DeleteJobUseCase,
    private readonly toggleJobStatus: ToggleJobStatusUseCase,
  ) {}

  /** GET /api/jobs - All jobs (admin) */
  handleGetAll = async (req: Request, res: Response) => {
    const jobs = await this.getAllJobs.execute();
    res.json({ data: jobs });
  };

  /** GET /api/jobs/active - Active jobs only (public) */
  handleGetActive = async (req: Request, res: Response) => {
    const jobs = await this.getActiveJobs.execute();
    res.json({ data: jobs });
  };

  /** GET /api/jobs/:id */
  handleGetById = async (req: Request, res: Response) => {
    const job = await this.getJobById.execute(req.params.id as string);
    if (!job) throw new AppError(404, "Job not found");
    res.json({ data: job });
  };

  /** POST /api/jobs */
  handleCreate = async (req: Request, res: Response) => {
    const data = createJobSchema.parse(req.body);
    const job = await this.createJob.execute(data);
    res.status(201).json({ data: job });
  };

  /** PATCH /api/jobs/:id */
  handleUpdate = async (req: Request, res: Response) => {
    const data = updateJobSchema.parse(req.body);
    const job = await this.updateJob.execute(req.params.id as string, data);
    if (!job) throw new AppError(404, "Job not found");
    res.json({ data: job });
  };

  /** DELETE /api/jobs/:id */
  handleDelete = async (req: Request, res: Response) => {
    const deleted = await this.deleteJob.execute(req.params.id as string);
    if (!deleted) throw new AppError(404, "Job not found");
    res.json({ message: "Job deleted successfully" });
  };

  /** PATCH /api/jobs/:id/toggle */
  handleToggle = async (req: Request, res: Response) => {
    const job = await this.toggleJobStatus.execute(req.params.id as string);
    if (!job) throw new AppError(404, "Job not found");
    res.json({ data: job });
  };
}
