import express from 'express';
import ItemController from './controller/ItemController';
import PointController from './controller/PointController';

const routers = express.Router();
const itemController = new ItemController();
const pointController = new PointController();

routers.get('/', (req, resp) => resp.send(''));

routers.get('/items', itemController.list);

routers.get('/points', pointController.list);
routers.get('/points/:id', pointController.getPoint);
routers.post('/points', pointController.savePoint);

export default routers;