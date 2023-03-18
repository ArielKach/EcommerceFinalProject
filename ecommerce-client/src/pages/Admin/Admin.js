import styles from './Admin.module.css'
import { Chart } from 'react-google-charts';

const Admin = () => {
    const currentUsersCount = 10;
    const data = [
        [
            {
                type: "date",
                id: "Date",
            },
            {
                type: "number",
                id: "Sum of orders",
            },
        ],
        [new Date(2023, 2, 13), 37032],
        [new Date(2023, 2, 14), 38024],
        [new Date(2023, 2, 15), 9999999],
        [new Date(2023, 2, 16), 38108],
        [new Date(2023, 2, 17), 38229],
    ];


    const options = {
        title: "Sum of orders per day",
    };
    return (
        <div className={styles.container}>
            <div className={styles.infoText}>Store information</div>
            <div className={styles.usersInfo}>
                <div className={styles.currentUsersText}>Current users count: </div>
                <div className={styles.currentUsersCount}>{currentUsersCount}</div>
            </div>

            <div className={styles.chartContainer}>
                <Chart
                    chartType="Calendar"
                    width="100%"
                    height="500px"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default Admin;
