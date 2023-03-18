import styles from "./HomeProductsContainer.module.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductsContainer = ({products}) => {
    return (
        <div className={styles.productsContainer}>
            {products.map((product) => (
                <ProductCard
                    key={`product${product._id}`}
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.image}
                    description={product.description}
                    brand={product.brand}
                    category={product.category}
                />
            ))}
        </div>
    );
};

export default ProductsContainer;
