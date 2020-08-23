export interface Item {
    id: number,
    title: string,
    image: string
}

export interface Point {
    name: string,
    email: string,
    whatsapp: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string,
    items: Array<number>
}