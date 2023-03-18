import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../navbar.module.css';

export const UserOptions = ({ name, handleLogout }) => {
	const [open, setOpen] = useState(null);
	const handleClose = () => setOpen(null);
	const navigate = useNavigate();

	return (
		<>
			<div
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={(e) => setOpen(e.currentTarget)}
				className={styles.icon}
			>
				<FaUser />
				{name}
			</div>
			<Menu
				id='basic-menu'
				anchorEl={open}
				open={!!open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						navigate('/orders');
					}}
				>
					Orders
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						navigate('/profile');
					}}
				>
					Profile
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						handleLogout();
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};
