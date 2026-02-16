import { Router } from "express";
import { JobController } from "../controllers/job-controller";

export function createJobRoutes(controller: JobController): Router {
  const router = Router();

  router.get("/", controller.handleGetAll);
  router.get("/active", controller.handleGetActive);
  router.get("/:id", controller.handleGetById);
  router.post("/", controller.handleCreate);
  router.patch("/:id", controller.handleUpdate);
  router.delete("/:id", controller.handleDelete);
  router.patch("/:id/toggle", controller.handleToggle);

  return router;
}
