import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaAmazon } from "react-icons/fa";
import { CATEGORIES } from "../../utils/mocks";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftContainer}>
            <Link to="/" className={styles.brand}>
                <FaAmazon />
                Ecommerce
            </Link>
            <ul className={styles.dropdown}>
                Categories
                <div className={styles.dropdownContent}>
                    {CATEGORIES.map(category => <Link to={`category/${category}`} className={styles.dropdownItem}>
                        {category}
                    </Link>
                    )}
                </div>
            </ul>
            </div>
            <Link to="cart" className={styles.cart}>
                <FaShoppingCart />
                Cart
            </Link>
        </nav>
    );
};

export default Navbar;
