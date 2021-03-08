const { Router } = require('express');
const router = Router();
const service = require('../services/user.service');


router.get('/api/user', (req, res) => {
    res.status(400).send('Unsupported');
});

router.post('/api/user', async (req, res) => {
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

module.exports = router;