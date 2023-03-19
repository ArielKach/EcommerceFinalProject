import styles from "./ProductsContainer.module.css";
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
                />
            ))}
        </div>
    );
};

export default ProductsContainer;
