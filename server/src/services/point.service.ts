import { Point } from "../models/point.model";
import knex from '../database/connection';

class PointService {

    async getPoint(id: number): Promise<Point> {
        const point = await knex('point').where('id', id).first();
        if (!point) {
            return point;
        }
        const items = await knex('item')
            .join('point_item', 'item.id', '=', 'point_item.id_item')
            .where('point_item.id_point', id);
        console.log({ ...point, items });
        return { ...point, items };
    }

    public savePoint(point: Point): Promise<any> {
        return new Promise((res, rej) => this._savePoint(res, rej, point));
    }

    async _savePoint(resolve: Function, reject: Function, point: Point) {
        const tx = await knex.transaction();
        try {
            debugger;
            const { items } = point;
            const { city, email, latitude, longitude, name, uf, whatsapp } = point;
            const ids = await tx('point').insert({
                city, email, latitude, longitude, name, uf, whatsapp
            });
            const itemsPoints = items && items.map(i => ({
                id_item: i,
                id_point: ids[0],
            }));
            if (itemsPoints) {
                tx('point_item').insert(itemsPoints);
            }
            tx.commit();
            resolve();
        } catch (ex) {
            tx.rollback();
            console.error(ex);
            reject(ex);
        }
    }
}

export default PointService;