import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('point', table=> {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('whatsapp').notNullable().unique();
        table.string('email').notNullable().unique();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('point');
}