import styles from "./Home.module.css";
import HomeProductsContainer from "../../components/HomeProductsContainer/HomeProductsContainer"
import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import { getProducts, getProductsByName } from "../../utils/api";

const Home = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const searchProducts = (event) => {
        setSearch(event.target.value);
    }

    const fetchProducts = async () => {
        const request = await (search === "" ? getProducts() : getProductsByName(search));

        setProducts(request.data)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchProducts();
    }, [search])
    return (
        <Fragment  >
            <input className={styles.search} placeholder="Enter Product name" onChange={searchProducts} />
            {!isLoading ?
                <div className={styles.container}>
                    <HomeProductsContainer products={products} />  </div> : <div style={{ textAlign: "center", marginTop: "6rem" }}><CircularProgress size={150} />
                </div>}
        </Fragment>
    );
};

export default Home;
