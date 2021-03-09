const { Router } = require('express');
const router = Router();
const service = require('../services/project.service');


router.get('/api/project/:uid', async (req, res) => {
    try{
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

router.post('/api/project', async (req, res) => {
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

router.post('/api/project/:pid/add-tasks', async (req, res) => {
    try {
        if (!req.params.pid){
            throw new Error("Couldn't get project id");
        }
        res.send({
            success: true,
            data: await service.createTasks(req.params.pid, req.body)
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

router.put('/api/project/:pid', async (req, res) => {
    try {
        if (!req.params.pid){
            throw new Error("Couldn't get project id");
        }
        res.send({
            success: true,
            data: await service.update(req.params.pid, req.body)
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

module.exports = router;