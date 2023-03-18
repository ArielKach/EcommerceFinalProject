import styles from "./Home.module.css";
import {PROCUCTS} from "../../utils/mocks";
import HomeProductsContainer from "../../components/HomeProductsContainer/HomeProductsContainer"

const Home = () => {
    const originalProducts = PROCUCTS;

    return (
        <div className={styles.container}>
            <HomeProductsContainer products={originalProducts}/>
        </div>
    );
};

export default Home;
