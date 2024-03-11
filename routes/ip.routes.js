import Router from 'express';
import authRequired from '../middlewares/validateToken.js'

import {
    getIp,
    getIps,
    createIp,
    deleteIp,
    updateIp,
} from '../controllers/ip.controllers.js';

const router = Router()

router.get('/ip', authRequired, getIps);

router.get('/ip/:CodUnico', authRequired, getIp);

router.post('/ip', authRequired, createIp);

router.delete('/ip/:ip', authRequired, deleteIp);

router.put('/ip/:ip', authRequired, updateIp);

export default router
