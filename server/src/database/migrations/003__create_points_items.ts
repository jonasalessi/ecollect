import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('point_item', table=> {
        table.string('id_point').notNullable().references("id").inTable("point");
        table.string('id_item').notNullable().references("id").inTable("item");
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('point_item');
}