import {Request, Response} from 'express';
import knex from './../database/connection';

class PointController {
    async savePoint(req: Request, resp: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = req.body;
        const tx = await knex.transaction();
        try {
            const ids = await tx('point').insert({
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
            }); 
            const itemsPoints = items && items.map(i => ({
                id_item: i,
                id_point: ids[0],
            }));
            if (itemsPoints) {
                tx('point_item').insert(itemsPoints);
            }
            tx.commit();
            resp.sendStatus(201);
        } catch(ex) {
            tx.rollback();
            console.error(ex);
            resp.sendStatus(400);
        }
    }   
    
    async getPoint(req: Request, resp: Response) {
        const {id} = req.params;
    
        const point = await knex('point').where('id', id).first();
        
        if (!point) {
            resp.status(400).json({message: 'Not found'});
            return;
        }
        
        const items = await knex('item')
        .join('point_item', 'item.id', '=', 'point_item.id_item')
        .where('point_item.id_point', id);
        
        resp.json({point, items});
    }

    async list(req: Request, resp: Response) {
        const points = await knex('point').select('*');
        resp.json(points);
    }
}

export default PointController;