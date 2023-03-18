import {PROCUCTS} from "./mocks";
import axios from 'axios';

export const apiUrl = 'http://localhost:3001/api'

export const getProductData = (
    productId
) => {
    return PROCUCTS.find((product) => product.id === productId);
};

export const getProducts = () => {
   return axios.get(`${apiUrl}/product/`)
}
