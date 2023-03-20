import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getOrdersSumByDates } from '../../utils/api';
import styles from './Admin.module.css';
import { Calendar } from './Calendar';
const Admin = ({ currentUsersCount }) => {
	const [rawData, setRawData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const response = await getOrdersSumByDates();
			setRawData(response.data.map((res) => ({ date: new Date(res.date), sum: res.sum })));
			setIsLoading(false);
		}
		setIsLoading(true);
		fetchData();
	}, []);
	const filledData = (data) => {
		const yearsInData = data
			.reduce((years, chartData) => {
				if (!years.includes(chartData.date.getUTCFullYear())) {
					years.push(chartData.date.getUTCFullYear());
				}
				return years;
			}, [])
			.sort((a, b) => a - b);

		const startDate = new Date(`${yearsInData[0]}`);
		const endDate = new Date(`${yearsInData[yearsInData.length - 1] + 1}`);

		const allDates = new Set();
		for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
			const a = new Date(d);
			a.setHours(5);
			allDates.add(a.getTime());
		}

		data.forEach((chartData) => {
			chartData.date.setHours(5);
			allDates.delete(chartData.date.getTime());
		});

		return data.concat(
			...[...allDates].map((date) => {
				return { date: new Date(date), sum: 0 };
			})
		).sort((a, b) => a.date.getTime() - b.date.getTime());
	};

	if (!rawData) {
		return null;
	}
	if (isLoading) {
		return <div style={{ textAlign: 'center', marginTop: '6rem' }}>
			<CircularProgress size={150} />
		</div>;
	}
	return (
		<div className={styles.container}>
			<div className={styles.infoText}>Store information</div>
			<div className={styles.usersInfo}>
				<div className={styles.currentUsersText}>Current users count: </div>
				<div className={styles.currentUsersCount}>{currentUsersCount}</div>
			</div>

			<div className={styles.orderSumText}>Orders sum per day:</div>
			<div className={styles.chartContainer}>
				<Calendar data={filledData(rawData)} x={(x) => x.date} y={(y) => y.sum} width={1200}></Calendar>
			</div>
		</div>
	);
};

export default Admin;
