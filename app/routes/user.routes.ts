import { Request, Response, Router } from 'express';
import service from '../services/user.service';
const router = Router();


router.get('/api/user', async (req:Request, res:Response) => {
    try{
        res.send({
            success: true,
            data: await service.get()
        });
    }
    catch(error){
        console.error(error);
        res.status(400).send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.post('/api/user', async (req:Request, res:Response) => {
    try {
        res.send({
            success: true,
            data: await service.create(req.body)
        });
    }
    catch (error){
        console.error(error);
        res.status(400).send({
            success: false,
            errorMessage: error.message
        });
    }
});

router.put('/api/user/:uid', async (req:Request, res:Response) => {
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
        res.status(400).send({
            success: false,
            errorMessage: error.message
        });
    }
});

export default router;