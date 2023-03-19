import { PROCUCTS } from './mocks';
import axios from 'axios';

export const apiUrl = 'http://localhost:3001/api';

export const getProductData = (productId) => {
	return PROCUCTS.find((product) => product.id === productId);
};

export const getProducts = () => {
	return axios.get(`${apiUrl}/product/`);
};

export const getCart = (userId) => {
	return axios.get(`${apiUrl}/cart`, {
		headers: {
			userId,
		},
	});
};

export const deleteCart = (userId) => {
	return axios.put(`${apiUrl}/cart`,{}, {
		headers: {
			userId,
		},
	});
};

export const getCategories = () => {
	return axios.get(`${apiUrl}/category/`);
}

export const getProductsByCategory = (category) => {
    return axios.get(`${apiUrl}/product/${category}`);
};