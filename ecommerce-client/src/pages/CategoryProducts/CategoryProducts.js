import styles from "./CategoryProducts.module.css";
import { useState, useEffect, Fragment, useMemo } from "react";
import { getProductsByCategory } from "../../utils/api";
import Filter from "../../components/Filter/Filter";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import Sort from "../../components/Sort/Sort";
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';

const sortKeys = {
    lowToHigh: (a, b) => a.price - b.price,
    highToLow: (a, b) => b.price - a.price,
};

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([]);

    const [sortState, setSortState] = useState({
        lowToHigh: false,
        highToLow: false,
    });

    const [filterState, setFilterState] = useState(
        {}
    );

    const fetchProducts = async () => {
        setProducts([])
        setIsLoading(true)
        const products = await getProductsByCategory(categoryName);
        setProducts(products.data.allProducts);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, [categoryName])

    const brands = useMemo(() => products.reduce((accumulator, proudct) => {
        if (proudct.brand !== null && proudct.brand !== undefined && !accumulator.includes(proudct.brand)) {
            accumulator.push(proudct.brand)
        }

        return accumulator;
    }, []), [products])

    useEffect(() => {
        setFilterState(brands.reduce(
            (accumulator, value) => ({ ...accumulator, [value]: false }),
            {}
        ))
    }, [categoryName, brands])

    const updateSortProducts = (
        e
    ) => {
        const key = e.target.name;
        Object.keys(sortState).forEach(
            (key) => (sortState[key] = false)
        );
        setSortState((prevState) => ({ ...prevState, [key]: true }));
    };

    const filterProducts = (e) => {
        const key = e.target.name;
        setFilterState((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const getFilterdProducts = () => {
        const keys = Object.keys(filterState);
        const filteredBrands = keys.filter((key) => filterState[key]);
        if (filteredBrands.length === 0) {
            return products;
        } else {
            return products.filter((product) =>
                filteredBrands.includes(product.brand)
            )
        }

    }

    const sortProducts = (productsToSort) => {
        if (sortState.lowToHigh) {
            return productsToSort.sort(sortKeys.lowToHigh);
        }

        if (sortState.highToLow) {
            return productsToSort.sort(sortKeys.highToLow);
        }

        return productsToSort;
    }

    const productsToShow = sortProducts(getFilterdProducts());

    return (
        <div className={styles.container}>
            {!isLoading ? <Fragment>
                <section className={styles.sortAndFilter}>
                    {brands.length > 0 ? <Filter filterState={filterState} handleOnFilter={filterProducts} /> : null}
                    < Sort handleSortChange={updateSortProducts} sortState={sortState} />
                </section>
                <ProductsContainer products={productsToShow} /> 
                </Fragment> : <CircularProgress size={150} />

            }
        </div>
    );
};

export default CategoryProducts;
