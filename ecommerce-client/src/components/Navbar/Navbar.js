import styles from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaAmazon, FaUser } from 'react-icons/fa';
import { useContext } from 'react';
import { TokenContext, UserContext } from '../../context/TokenContext';
import { useCookies } from 'react-cookie';
import { successMsg } from '../../utils/toastUtils';
import { NavbarDropdown } from './NavbarDropdown/NavbarDropdown';
import { CATEGORIES } from '../../utils/mocks';
import { getIsAdmin } from '../../utils/userUtils';

const Navbar = () => {
	const userDetails = useContext(UserContext);
	const [cookies, setCookie, removeItem] = useCookies();
	const navigate = useNavigate();

	const handleLogout = () => {
		removeItem('ecommerceToken');
		successMsg('You Logged Out Successfully!');
		navigate('/');
	};
	return (
		<nav className={styles.navbar}>
			<div className={styles.leftIcons}>
				<Link to='/' className={styles.brand}>
					<FaAmazon />
					Ecommerce
				</Link>
				<>
					<NavbarDropdown
						mainText={'Categories'}
						options={CATEGORIES.map((category) => ({
							text: category,
							onClick: () => navigate(`/category/${category}`),
						}))}
					/>
				</>
			</div>
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
						<NavbarDropdown
							handleLogout={handleLogout}
							mainText={
								<>
									{' '}
									<FaUser />
									{userDetails.name}
								</>
							}
							options={[
								{
									onClick: () => navigate('/order'),
									text: 'Order',
								},
								userDetails.isAdmin && {
									onClick: () => navigate('/admin'),
									text: 'Admin',
								},
								{
									onClick: handleLogout,
									text: 'Logout',
								},
							]}
						/>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
