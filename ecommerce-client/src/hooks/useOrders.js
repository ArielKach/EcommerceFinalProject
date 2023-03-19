import { useCallback, useContext, useState } from 'react';
import { getOrdersByUserId } from '../utils/api';
import { UserContext } from '../context/UserContext';

export const useOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const { user } = useContext(UserContext);

    const getOrders = useCallback( async () => {
		setIsLoading(true);
		setOrders((await getOrdersByUserId(user.uId)).data);
		setIsLoading(false);
	}, [user]);

    return { loading, orders, getOrders };
};
