import styles from "./HomeProductsContainer.module.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductsContainer = ({products}) => {
    return (
        <div className={styles.productsContainer}>
            {products.length > 0 ? products.map((product) => (
                <ProductCard
                    key={`product${product._id}`}
                    id={product._id}
                    title={product.name}
                    price={product.price}
                    imageUrl={product.image}
                    description={product.description}
                    brand={product.brand}
                    category={product.categoryName}
                />
            )): <div className={styles.noProductsFound}>No products found...</div>}
        </div>
    );
};

export default ProductsContainer;
