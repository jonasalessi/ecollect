import { State } from "../types/ibge.interface";
import axios from 'axios';


export const getAllProvinces = () => {
    return axios.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
}

export const getCitiesByProvince = (uf: String) => {
    return axios.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
}
