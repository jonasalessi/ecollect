import api from "./api";
import { Item } from "../types/itemPoint";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getItemsAvailableToDisplay = () => {
    return api.get('/items');
}

export const saveNewPoint = (values: any, position: [number, number]) => {
    return api.post('/points', {
        ...values,
        latitude: position[0],
        longitude: position[1]
    }).then(() => {
        toast.success('🦄 Wow so easy! Thanks for your collaboration', {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    });
}
