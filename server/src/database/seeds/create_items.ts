import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('item').insert([
        { title: 'Lampâda', image: 'lampadas.svg' },
        { title: 'Baterias', image: 'baterias.svg' },
        { title: 'Eletronicos', image: 'eletronicos.svg' },
        { title: 'Oleo', image: 'oleo.svg' },
        { title: 'Organico', image: 'organicos.svg' },
        { title: 'Papeis', image: 'papeis-papelao.svg' },
    ]);
}