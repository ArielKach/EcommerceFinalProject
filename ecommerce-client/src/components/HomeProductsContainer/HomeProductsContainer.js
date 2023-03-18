import styles from "./HomeProductsContainer.module.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductsContainer = ({products}) => {
    return (
        <div className={styles.productsContainer}>
            {products.map((product) => (
                <ProductCard
                    key={`product${product.id}`}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    description={product.description}
                    brand={product.brand}
                    category={product.category}
                />
            ))}
        </div>
    );
};

export default ProductsContainer;
