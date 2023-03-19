import styles from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaAmazon, FaUser } from 'react-icons/fa';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { successMsg } from '../../utils/toastUtils';
import { NavbarDropdown } from './NavbarDropdown/NavbarDropdown';

const Navbar = ({categories}) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const handleLogout = () => {
		localStorage.removeItem('user');
		successMsg('You Logged Out Successfully!');
		navigate('/');
		navigate(0);
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
						options={categories.map((category) => ({
							text: category,
							onClick: () => navigate(`/category/${category}`),
						}))}
					/>
				</>
			</div>
			<div className={styles.rightIcons}>
				{!user ? (
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
									<FaUser />
									{user.displayName}
								</>
							}
							options={[
								{
									onClick: () => navigate('/order'),
									text: 'Order',
								},
								user.isAdmin && {
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
