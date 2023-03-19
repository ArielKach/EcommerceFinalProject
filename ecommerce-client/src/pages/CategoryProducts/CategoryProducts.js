import styles from "./CategoryProducts.module.css";
import { useState, useEffect, Fragment, useMemo } from "react";
import { getProductsByCategory, getBrandsByCategory } from "../../utils/api";
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
    const [isBrandsLoading, setIsBrandsLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([])
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
        const keys = Object.keys(filterState);
        const filteredBrands = keys.filter((key) => filterState[key]);
        const brandsToGet = filteredBrands.length === 0 ? brands : filteredBrands
        const products = await getProductsByCategory(categoryName, brandsToGet);
        setProducts(products.data);
        setIsLoading(false);
    }

    const fetchBrands = async () => {
        setBrands([])
        setIsBrandsLoading(true)
        const brands = await getBrandsByCategory(categoryName);
        setBrands(brands.data);
        setIsBrandsLoading(false);
    }

    useEffect(() => {
        fetchBrands();
    }, [categoryName])

    useEffect(() => {
        setFilterState(brands.reduce(
            (accumulator, value) => ({ ...accumulator, [value]: false }),
            {}
        ))
    }, [categoryName, brands])

    useEffect(() => {
        if (filterState !== {}) {
            fetchProducts();
        }
    }, [filterState])

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

    const sortProducts = (productsToSort) => {
        if (sortState.lowToHigh) {
            return productsToSort.sort(sortKeys.lowToHigh);
        }

        if (sortState.highToLow) {
            return productsToSort.sort(sortKeys.highToLow);
        }

        return productsToSort;
    }

    const productsToShow = sortProducts(products);

    return (
        <div className={styles.container}>
            {!isBrandsLoading ? <Fragment>
                <section className={styles.sortAndFilter}>
                    {brands.length > 0 ? <Filter filterState={filterState} handleOnFilter={filterProducts} /> : null}
                    < Sort handleSortChange={updateSortProducts} sortState={sortState} />
                </section>
                {!isLoading ?
                    <ProductsContainer products={productsToShow} /> : <CircularProgress size={150} />}
            </Fragment> : <CircularProgress size={150} />

            }
        </div>
    );
};

export default CategoryProducts;
