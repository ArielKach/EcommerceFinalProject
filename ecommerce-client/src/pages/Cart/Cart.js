import styles from "./Cart.module.css";
import {useState, useEffect} from "react";
import CartCard from "../../components/CartCard/CartCard";
import {FaShoppingCart} from "react-icons/fa";

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const cart = [{price: 1129, quantity: 10, productId: 1}]

    useEffect(() => {
        const calculateTotalPrice = () => {
            const sum = cart.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0);

            setTotalPrice(sum);
        };

        if (cart.length > 0) calculateTotalPrice();
    }, [cart]);

    return (
        <div>
            {cart.length > 0 ? (
                <div className={styles.cartContainer}>
                    <div className={styles.header}>
                        <FaShoppingCart/>
                        <span>Shopping cart</span>
                    </div>

                    <div className={styles.productsContainer}>
                        {cart.map((item) => (
                            <CartCard
                                key={`cart-item${item.productId}`}
                                productId={item.productId}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>

                    <div className={styles.priceContainer}>
                        <button
                            className={styles.resetBtn}
                            onClick={() => {
                            }}
                        >
                            clear cart
                        </button>
                        <span>
              Total price:{" "}
                            <span
                                className={styles.totalPrice}
                            >{`${totalPrice.toLocaleString()}$`}</span>
            </span>
                    </div>
                </div>
            ) : (
                "Cart is empty."
            )}
        </div>
    );
};

export default Cart;
