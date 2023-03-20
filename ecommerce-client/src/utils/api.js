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

export const addToCart = (userId, productInfo) => {
	const product = { ...productInfo };
	product.productId = product['_id'];
	delete product['_id'];
	delete product['__v'];

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

export const updateProductQuantity = (userId, productId, quantity) => {
	return axios.post(
		`${apiUrl}/cart/updateProductQuantity`,
		{ productId, quantity },
		{
			headers: {
				userId,
			},
		}
	);
};

export const removeProductFromCart = (userId, productId) => {
	return axios.delete(`${apiUrl}/cart/delete-product/${productId}`, {
		headers: {
			userId,
		},
	});
};

export const getCategories = () => {
  return axios.get(`${apiUrl}/category/`);
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

export const getProductsByCategory = (category, brands) => {
	return axios.get(`${apiUrl}/product/${category}?brands=${encodeURIComponent(brands.join(','))}`);
};

export const getBrandsByCategory = (category) => {
	return axios.get(`${apiUrl}/product/brands/${category}`);
};


export const getProductsByName = (name) => {
	return axios.get(`${apiUrl}/product/search/${name}`);
};

export const getOrdersSumByDates = () => {
	return axios.get(`${apiUrl}/order/dates`);
};

export const getOrdersByUserId = (userId) => {
	return axios.get(`${apiUrl}/order/`, {
		headers: {
			userId,
		},
	});
};
