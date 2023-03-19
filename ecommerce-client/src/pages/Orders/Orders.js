import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useOrders } from '../../hooks/useOrders';
import { CircularProgress } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const Orders = () => {
	const { loading, orders, getOrders } = useOrders();

	useEffect(() => {
		getOrders();
	}, []);

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '6rem' }}>
				<CircularProgress size={150} />
			</div>
		);
	}
	if (orders && orders.length === 0) {
		return 'No orders found';
	}
	return (
		<div>
			<h2 style={{ padding: '2rem 4rem' }}>My orders</h2>
			<div style={{ padding: '0 2rem', margin: '0 2rem' }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<StyledTableRow>
								<StyledTableCell align='left'>ID</StyledTableCell>
								<StyledTableCell align='left'>Products</StyledTableCell>
								<StyledTableCell align='left'>Price&nbsp;($)</StyledTableCell>
								<StyledTableCell align='left'>Date</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{orders.map((row) => (
								<StyledTableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<StyledTableCell component='th' scope='row'>
										{row._id}
									</StyledTableCell>
									<StyledTableCell align='left'>{row.productIds.length}</StyledTableCell>
									<StyledTableCell align='left'>{row.totalPrice}</StyledTableCell>
									<StyledTableCell align='left'>{row.orderDate}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default Orders;
