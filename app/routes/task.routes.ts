import { Request, Response, Router } from "express";
import service from "../services/task.services";

const router = Router();

// Obtain list of tasks by userid
// Method: GET
router.get("/api/task/:uid", async (req:Request, res:Response) => {
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
    res.status(400).send({
      success: false,
      errorMessage: err.message,
    });
  }
});

// Add a new task
// Method: POST
router.post("/api/task", async (req:Request, res:Response) => {
  try {
    res.send({
      success: true,
      data: await service.create(req.body),
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.get("/api/task/:tid/start-task", async (req:Request, res:Response) => {
  try {
    const taskId = req.params.tid;
    if (!taskId) {
      throw new Error("Couldn't get task id");
    }
    res.send({
      success: true,
      data: await service.startATask(taskId),
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.get("/api/task/:tid/pause-task", async (req:Request, res:Response) => {
  try {
    const taskId = req.params.tid;
    if (!taskId) {
      throw new Error("Couldn't get task id");
    }
    res.send({
      success: true,
      data: await service.pauseATask(taskId),
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.get("/api/task/:tid/stop-task", async (req:Request, res:Response) => {
  try {
    const taskId = req.params.tid;
    if (!taskId) {
      throw new Error("Couldn't get task id");
    }
    res.send({
      success: true,
      data: await service.stopATask(taskId),
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.get("/api/task/:tid/restart-task", async (req:Request, res:Response) => {
  try {
    const taskId = req.params.tid;
    if (!taskId) {
      throw new Error("Couldn't get task id");
    }
    res.send({
      success: true,
      data: await service.restartATask(taskId),
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

router.put("/api/task/:tid", async (req:Request, res:Response) => {
  try {
    if (!req.params.tid) {
      throw new Error("Couldn't get task id.");
    }
    res.send({
      success: true,
      data: await service.update(req.params.tid, req.body),
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

export default router;
