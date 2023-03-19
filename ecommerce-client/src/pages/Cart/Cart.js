import styles from './Cart.module.css';
import { useState, useEffect, useContext } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import { FaShoppingCart } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';
import { deleteCart, getCart, removeProductFromCart, updateProductQuantity } from '../../utils/api';
import { UserContext } from '../../context/UserContext';

const Cart = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [cartProducts, setCartProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useContext(UserContext);

	const fetchCart = async () => {
		const res = await getCart(user.uId);
		if (res && res.data) {
			setCartProducts(res.data);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchCart();
	}, []);

	useEffect(() => {
		const calculateTotalPrice = () => {
			const sum = cartProducts.reduce((acc, curr) => {
				return acc + curr.quantity * curr.price;
			}, 0);

			setTotalPrice(sum);
		};

		if (cartProducts.length > 0) calculateTotalPrice();
	}, [cartProducts]);


	const handleQuantityChange = async (e, productId) => {
		const newQuantity = Number(e.target.value);
		const result = await updateProductQuantity(user.uId, productId, newQuantity);
		setCartProducts((cartProducts) =>
			cartProducts.map((product) => {
				if (product.productId === productId) {
					return { ...product, quantity: result.data.quantity };
				}
				return { ...product };
			})
		);
	};

	const removeProduct = async (productId) => {
		await removeProductFromCart(user.uId, productId);
		setCartProducts((cartProducts) => cartProducts.filter((product) => product.productId !== productId));
	};

	return isLoading ? (
		<div style={{ textAlign: 'center', marginTop: '6rem' }}>
			<CircularProgress size={150} />
		</div>
	) : (
		<div>
			{cartProducts.length > 0 ? (
				<div className={styles.cartContainer}>
					<div className={styles.header}>
						<FaShoppingCart />
						<span>Shopping cart</span>
					</div>

					<div className={styles.productsContainer}>
						{cartProducts.map((product) => (
							<CartCard
								key={`cart-item${product.productId}`}
								productData={product}
								quantity={product.quantity}
								handleQuantityChange={(e) => handleQuantityChange(e, product.productId)}
								removeProduct={() => {
									removeProduct(product.productId);
								}}
							/>
						))}
					</div>

					<div className={styles.priceContainer}>
						<button
							className={styles.resetBtn}
							onClick={async () => {
								const res = await deleteCart(user.uId);
								if (res) {
									setCartProducts([]);
								}
							}}
						>
							clear cart
						</button>
						<span>
							Total price: <span className={styles.totalPrice}>{`${totalPrice.toLocaleString()}$`}</span>
						</span>
					</div>
				</div>
			) : (
				'Cart is empty.'
			)}
		</div>
	);
};

export default Cart;
