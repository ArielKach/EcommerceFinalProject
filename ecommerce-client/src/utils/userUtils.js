import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { api } from '../globals';

export const register = async (email, password, name) => {
	try {
		return await axios.post(`${api}/auth/register`, { email, password, name }, { withCredentials: true });
	} catch (error) {
		return error?.response?.data;
	}
};

export const login = async (email, password) => {
	try {
		return await axios.post(`${api}/auth/logIn`, { email, password }, { withCredentials: true });
	} catch (error) {
		return error?.response?.data;
	}
};

export const resetPasswordWithEmail = async (email) => {
	try {
		return axios.post(`${api}/auth/resetPassword`, { email }, { withCredentials: true });
	} catch (error) {
		return error?.response?.data;
	}
};

export const getUser = (token, userId) => {
	return axios.get(
		`${api}/profile`,
		{
			headers: {
				Authorization: `${token}`,
				userid: `${userId}`,
			},
		},
		{ withCredentials: true }
	);
};