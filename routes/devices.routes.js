import Router from 'express';
import authRequired from '../middlewares/validateToken.js'

import {
    getDevices,
    getDeviceCod,
    getDeviceSerie,
    getDevicesRef,
    createDevices,
    deleteDevices,
    updateDevices,
} from '../controllers/devices.controllers.js';

const router = Router()

router.get('/devices', authRequired, getDevices);

router.get('/devices/Cod/:CodUnico', authRequired, getDeviceCod);

router.get('/devices/ser/:Serial', authRequired, getDeviceSerie);

router.get('/devices/ref/:Referencia', authRequired, getDevicesRef);

router.post('/devices', authRequired, createDevices);

router.delete('/devices/ser/:Serial', authRequired, deleteDevices);

router.put('/devices/ser/:Serial', authRequired, updateDevices);

export default router
