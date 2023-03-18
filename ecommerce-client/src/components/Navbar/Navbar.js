import styles from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaAmazon, FaUser } from 'react-icons/fa';
import { useContext } from 'react';
import { TokenContext, UserContext } from '../../context/TokenContext';
import { useCookies } from 'react-cookie';
import { successMsg } from '../../utils/toastUtils';
import { UserOptions } from './UserOptions/UserOptions';

const Navbar = () => {
	const userDetails = useContext(UserContext);
	const token = useContext(TokenContext);
	const [cookies, setCookie, removeItem] = useCookies();
	const navigate = useNavigate();

	const handleLogout = () => {
		removeItem('ecommerceToken');
		successMsg('You Logged Out Successfully!');
		navigate('/');
	};

	return (
		<nav className={styles.navbar}>
			<Link to='/' className={styles.brand}>
				<FaAmazon />
				Ecommerce
			</Link>
			<div className={styles.rightIcons}>
				{!cookies.ecommerceToken ? (
					<Link to='login' className={styles.icon}>
						login
					</Link>
				) : (
					<>
						<Link to='cart' className={styles.icon}>
							<FaShoppingCart />
							Cart
						</Link>
						<UserOptions name={userDetails.name} handleLogout={handleLogout} />
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
