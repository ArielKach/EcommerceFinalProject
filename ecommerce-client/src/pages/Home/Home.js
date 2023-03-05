import styles from "./Home.module.css";
import {useState, useEffect} from "react";
import {PROCUCTS, BRANDS} from "../../utils/mocks";
import Filter from "../../components/Filter/Filter";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import Sort from "../../components/Sort/Sort";


const sortKeys = {
    lowToHigh: (a, b) => a.price - b.price,
    highToLow: (a, b) => b.price - a.price,
};

const Home = () => {
    const originalProducts = PROCUCTS;
    const [products, setProducts] = useState(originalProducts);
    const [filterState, setFilterState] = useState(
        BRANDS.reduce(
            (accumulator, value) => ({...accumulator, [value]: false}),
            {}
        )
    );

    const [sortState, setSortState] = useState({
        lowToHigh: false,
        highToLow: false,
    });

    const sortProductsByKey = (key) => {
        if (Object.keys(sortKeys).includes(key)) {
            setProducts([...products.sort(sortKeys[key])]);
        }
    };

    const sortProducts = (
        e
    ) => {
        const key = e.target.name;
        sortProductsByKey(key);
        Object.keys(sortState).forEach(
            (key) => (sortState[key] = false)
        );
        setSortState((prevState) => ({...prevState, [key]: true}));
    };

    const filterProducts = (e) => {
        const key = e.target.name;
        setFilterState((prev) => ({...prev, [key]: !prev[key]}));
    };

    useEffect(() => {
        const keys = Object.keys(filterState);
        const filteredBrands = keys.filter((key) => filterState[key]);

        if (filteredBrands.length === 0) {
            setProducts(originalProducts);
        } else {
            setProducts(
                originalProducts.filter((product) =>
                    filteredBrands.includes(product.sellerName)
                )
            );
        }
    }, [filterState]);

    return (
        <div className={styles.container}>
            <section className={styles.sortAndFilter}>
                <Filter filterState={filterState} handleOnFilter={filterProducts}/>
                <Sort handleSortChange={sortProducts} sortState={sortState}/>
            </section>
            <ProductsContainer products={products}/>
        </div>
    );
};

export default Home;
