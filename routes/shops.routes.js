import Router from 'express';
import authRequired from '../middlewares/validateToken.js'

import {
    getShop,
    getShops,
    createShops,
    deleteShops,
    updateShops,
} from '../controllers/shops.controllers.js';

const router = Router()

router.get('/shops', authRequired, getShops);

router.get('/shops/:CodUnico', authRequired, getShop);

router.post('/shops', createShops);

router.delete('/shops/:CodUnico', authRequired, deleteShops);

router.put('/shops/:CodUnico', authRequired, updateShops);

export default router
