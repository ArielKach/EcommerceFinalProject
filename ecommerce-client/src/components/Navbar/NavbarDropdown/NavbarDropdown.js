import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import styles from '../navbar.module.css';

export const NavbarDropdown = ({ mainText, options }) => {
	const [open, setOpen] = useState(null);
	const handleClose = () => setOpen(null);
	const handleClick = (e) => setOpen(e.currentTarget);

	return (
		<>
			<div
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={styles.icon}
			>
				{mainText}
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
				{options.map((option, i) => (
					<MenuItem
						key={i}
						onClick={() => {
							handleClose();
							option.onClick();
						}}
					>
						{option.text}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
