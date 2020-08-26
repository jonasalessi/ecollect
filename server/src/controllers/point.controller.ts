import { Request, Response } from 'express';
import PointService from '../services/point.service';
import knex from '../database/connection';

class PointController {

    readonly pointService: PointService;

    constructor() {
        this.pointService = new PointService();
    }

    savePoint = (req: Request, resp: Response) => {
        this.pointService.savePoint(req.body)
            .then(() => resp.sendStatus(201))
            .catch(error => resp.status(400).send(error));
    }

    getPoint = async (req: Request, resp: Response) => {
        const { id } = req.params;

        const point = await this.pointService.getPoint(Number.parseInt(id));
        if (!point) {
            resp.status(400).json({ message: 'Not found' });
            return;
        }
        resp.json(point);
    }

    async list(req: Request, resp: Response) {
        const points = await knex('point').select('*');
        resp.json(points);
    }
}

export default PointController;