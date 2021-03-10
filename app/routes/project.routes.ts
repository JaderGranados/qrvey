import { Request, Response, Router } from "express";
import service from "../services/project.service";

const router = Router();

router.get("/api/project/:uid", async (req:Request, res:Response) => {
  try {
    const userId = req.params.uid;
    if (!userId) {
      throw new Error("Request with no user id");
    }
    res.send({
      success: true,
      data: await service.getByUserId(userId),
    });
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      errorMessage: err.message,
    });
  }
});

router.post("/api/project", async (req:Request, res:Response) => {
  try {
    res.send({
      success: true,
      data: await service.create(req.body),
    });
  } catch (error) {
    console.error(error.message);
    res.send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.post("/api/project/:pid/add-tasks", async (req:Request, res:Response) => {
  try {
    if (!req.params.pid) {
      throw new Error("Couldn't get project id");
    }
    res.send({
      success: true,
      data: await service.createTasks(req.params.pid, req.body),
    });
  } catch (error) {
    console.error(error.message);
    res.send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.put("/api/project/:pid", async (req:Request, res:Response) => {
  try {
    if (!req.params.pid) {
      throw new Error("Couldn't get project id");
    }
    res.send({
      success: true,
      data: await service.update(req.params.pid, req.body),
    });
  } catch (error) {
    console.error(error.message);
    res.send({
      success: false,
      errorMessage: error.message,
    });
  }
});

export default router;
