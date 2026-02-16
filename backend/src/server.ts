import "express-async-errors";
import express from "express";
import cors from "cors";
import { env } from "./config/env";

// Infrastructure
import { SupabaseJobRepository } from "./infrastructure/repositories/supabase-job-repository";

// Application (Use Cases)
import {
  GetAllJobsUseCase,
  GetActiveJobsUseCase,
  GetJobByIdUseCase,
  CreateJobUseCase,
  UpdateJobUseCase,
  DeleteJobUseCase,
  ToggleJobStatusUseCase,
} from "./application";

// Presentation
import { JobController } from "./presentation/controllers/job-controller";
import { createJobRoutes } from "./presentation/routes/job-routes";
import { errorHandler } from "./presentation/middleware/error-handler";

// ── Dependency Injection ────────────────────────────────────
const jobRepository = new SupabaseJobRepository();

const jobController = new JobController(
  new GetAllJobsUseCase(jobRepository),
  new GetActiveJobsUseCase(jobRepository),
  new GetJobByIdUseCase(jobRepository),
  new CreateJobUseCase(jobRepository),
  new UpdateJobUseCase(jobRepository),
  new DeleteJobUseCase(jobRepository),
  new ToggleJobStatusUseCase(jobRepository),
);

// ── Express App ─────────────────────────────────────────────
const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Job routes
app.use("/api/jobs", createJobRoutes(jobController));

// Error handler (must be last)
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────
const host = "0.0.0.0"; // Bind to all interfaces (required for Render)

app.listen(env.port, host, () => {
  console.log(`🚀 FairPlay Backend running on http://${host}:${env.port}`);
  console.log(`   Environment: ${env.nodeEnv}`);
  console.log(`   Health: http://localhost:${env.port}/api/health`);
  console.log(`   Jobs:   http://localhost:${env.port}/api/jobs`);
});

export default app;
