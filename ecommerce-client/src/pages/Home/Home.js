import styles from "./Home.module.css";
import HomeProductsContainer from "../../components/HomeProductsContainer/HomeProductsContainer"
import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import { getProducts } from "../../utils/api";

const Home = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        const request = await getProducts();
        setProducts(request.data)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchProducts();
    }, [])
    return (
        <Fragment  >
            {!isLoading ?
                <div className={styles.container}>
                    <HomeProductsContainer products={products} />
                </div> : <div style={{textAlign: "center",marginTop: "6rem"}}><CircularProgress size={150}/></div>}
        </Fragment>
    );
};

export default Home;
