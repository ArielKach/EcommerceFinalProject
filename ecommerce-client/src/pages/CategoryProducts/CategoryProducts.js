import styles from "./CategoryProducts.module.css";
import { useState, useEffect } from "react";
import { PROCUCTS } from "../../utils/mocks";
import Filter from "../../components/Filter/Filter";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import Sort from "../../components/Sort/Sort";
import { useParams } from "react-router-dom";


const sortKeys = {
    lowToHigh: (a, b) => a.price - b.price,
    highToLow: (a, b) => b.price - a.price,
};

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const categoryProducts = PROCUCTS.filter(product => product.category === categoryName);
    const brands = categoryProducts.reduce((accumulator, proudct) => {
        if (!accumulator.includes(proudct.brand)) {
            accumulator.push(proudct.brand)
        }

        return accumulator;
    }, [])
    const [products, setProducts] = useState(categoryProducts);
    const [filterState, setFilterState] = useState(
        brands.reduce(
            (accumulator, value) => ({ ...accumulator, [value]: false }),
            {}
        )
    );

    useEffect(() => {
        setFilterState(brands.reduce(
            (accumulator, value) => ({ ...accumulator, [value]: false }),
            {}
        ))
    }, [categoryName])

    useEffect(() => {
        const keys = Object.keys(filterState);
        const filteredBrands = keys.filter((key) => filterState[key]);

        if (filteredBrands.length === 0) {
            setProducts(categoryProducts);
        } else {
            setProducts(
                categoryProducts.filter((product) =>
                    filteredBrands.includes(product.brand)
                )
            );
        }
    }, [filterState]);

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
        setSortState((prevState) => ({ ...prevState, [key]: true }));
    };

    const filterProducts = (e) => {
        const key = e.target.name;
        setFilterState((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={styles.container}>
            <section className={styles.sortAndFilter}>
                {brands.length > 0 ? <Filter filterState={filterState} handleOnFilter={filterProducts} /> : null}
                < Sort handleSortChange={sortProducts} sortState={sortState} />
            </section>
            <ProductsContainer products={products} />
        </div>
    );
};

export default CategoryProducts;
