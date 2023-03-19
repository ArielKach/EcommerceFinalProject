import axios from "axios";

export const apiUrl = "http://localhost:3001/api";

export const getProductData = (productId) => {
  return axios.get(`${apiUrl}/product/id/${productId}`);
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
  return axios.put(
    `${apiUrl}/cart`,
    {},
    {
      headers: {
        userId,
      },
    }
  );
};

export const addToCart = (userId, product) => {
  return axios.post(
    `${apiUrl}/cart/addProduct`,
    { product },
    {
      headers: {
        userId,
      },
    }
  );
};

export const getCategories = () => {
  return axios.get(`${apiUrl}/category/`);
};

export const getProductsByCategory = (category) => {
  return axios.get(`${apiUrl}/product/${category}`);
};

export const getOrderSum = (userId) => {
  return axios.get(`${apiUrl}/cart/sum`, {
    headers: {
      userId,
    },
  });
};

export const addOrder = (userId, productIds, totalPrice) => {
  return axios.post(
    `${apiUrl}/order`,
    { productIds, totalPrice },
    {
      headers: {
        userId,
      },
    }
  );
};
