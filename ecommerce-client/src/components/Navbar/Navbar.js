import styles from "./navbar.module.css";
import {Link} from "react-router-dom";
import {FaShoppingCart, FaAmazon} from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brand}>
                <FaAmazon/>
                Ecommerce
            </Link>
            <Link to="cart" className={styles.cart}>
                <FaShoppingCart/>
                Cart
            </Link>
        </nav>
    );
};

export default Navbar;
