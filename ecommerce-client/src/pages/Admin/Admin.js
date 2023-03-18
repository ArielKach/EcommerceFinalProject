import styles from './Admin.module.css'
import { Calendar } from './Calendar';
const Admin = () => {
    const currentUsersCount = 10;

    const rawData = [{ date: new Date('2023-01-02'), sum: 1000 }, { date: new Date('2023-01-04'), sum: 1040 }, { date: new Date('2023-03-04'), sum: 10400 }]
    const filledData = (data) => {
        const yearsInData = data.reduce((years, chartData) => {
            if (!years.includes(chartData.date.getUTCFullYear())) {
                years.push(chartData.date.getUTCFullYear())
            }
            return years;
        }, []).sort((a, b) => a - b)

        const startDate = new Date(`${yearsInData[0]}`)
        const endDate = new Date(`${yearsInData[yearsInData.length - 1] + 1}`)

        const allDates = new Set();
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            allDates.add((new Date(d)).getTime());
        }

        data.forEach(chartData => {
            allDates.delete(chartData.date.getTime())
        })

        console.log(allDates)
        return data.concat(...[...allDates].map(date => { return { date: new Date(date), sum: 0 } }))
    }
    return (
        <div className={styles.container}>
            <div className={styles.infoText}>Store information</div>
            <div className={styles.usersInfo}>
                <div className={styles.currentUsersText}>Current users count: </div>
                <div className={styles.currentUsersCount}>{currentUsersCount}</div>
            </div>

            <div className={styles.orderSumText}>
                Orders sum per day:
            </div>
            <div className={styles.chartContainer} >
                <Calendar data={filledData(rawData)} x={(x) => x.date} y={y => y.sum} width={1200}></Calendar>
            </div>
        </div>
    );
};

export default Admin;
