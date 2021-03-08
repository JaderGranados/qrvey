const { Router } = require('express');
const router = Router();
const service = require('../services/task.services');

// Obtain list of tasks by userid
// Method: GET
router.get('/api/task/:uid', async (req, res) => {
    try {
        const userId = req.params.uid;
        if (!userId){
            throw new Error("Request with no user id");
        }
        res.send({
            success: true,
            data: await service.getByUserId(userId)
        });
    }
    catch (err){
        console.error(err);
        res.send({
            success: false,
            errorMessage: err.message
        });
    }
});

// Add a new task
// Method: POST
router.post('/api/task', async (req, res) => {
    try {
        res.send({
            success: true,
            data: await service.create(req.body)
        });
    }
    catch (error){
        console.error(error.message);
        res.send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.get('/api/task/start-task/:tid', async (req, res) => {
    try {
        const taskId = req.params.tid;
        if (!taskId){
            throw new Error("Couldn't get task id");
        }
        res.send({
            success: true,
            data: await service.startATask(taskId)
        });
    }
    catch (error){
        console.error(error);
        res.send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.get('/api/task/pause-task/:tid', async (req, res) => {
    try {
        const taskId = req.params.tid;
        if (!taskId){
            throw new Error("Couldn't get task id");
        }
        res.send({
            success: true,
            data: await service.pauseATask(taskId)
        });
    }
    catch (error){
        console.error(error);
        res.send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.get('/api/task/stop-task/:tid', async (req, res) => {
    try {
        const taskId = req.params.tid;
        if (!taskId){
            throw new Error("Couldn't get task id");
        }
        res.send({
            success: true,
            data: await service.stopATask(taskId)
        });
    }
    catch (error){
        console.error(error);
        res.send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.get('/api/task/restart-task/:tid', async (req, res) => {
    try {
        const taskId = req.params.tid;
        if (!taskId){
            throw new Error("Couldn't get task id");
        }
        res.send({
            success: true,
            data: await service.restartATask(taskId)
        });
    }
    catch (error){
        console.error(error);
        res.send({
            success: false,
            errorMessage: error.message
        });
    }
});

module.exports = router;