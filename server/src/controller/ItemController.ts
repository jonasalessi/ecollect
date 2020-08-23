import {Request, Response} from 'express';
import knex from './../database/connection';

class ItemController {
    async list(req: Request, resp: Response) {
        const items = await knex('item').select('*');
        resp.json(items.map(it => ({
            ...it,
            image: `http://localhost:3333/uploads/${it.image}`
        })));
    }
}

export default ItemController;