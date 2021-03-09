const { Router } = require('express');
const router = Router();
const service = require('../services/user.service');


router.get('/api/user', async (req, res) => {
    try{
        res.send({
            success: true,
            data: await service.get()
        });
    }
    catch(error){
        console.error(error);
        res.send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.post('/api/user', async (req, res) => {
    try {
        res.send({
            success: true,
            data: await service.create(req.body)
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

router.put('/api/user/:uid', async (req, res) => {
    try {
        if(!req.params.uid){
            throw new Error("Couldn't get user id");
        }
        res.send({
            success: true,
            data: await service.update(req.params.uid, req.body)
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