import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard  = ({
  id,
  title,
  price,
  imageUrl,
  description,
  brand,
  category
}) => {
  return (
    <div className={styles.container}>
      <Link to={`/product/${id}`} className={styles.productImage}>
        <img src={imageUrl} alt="" />
      </Link>

      <section className={styles.info}>
        <h3 className={styles.title}>
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <div className={styles.price}>{`${price.toLocaleString()}$`}</div>
        <div className={styles.description}>{description}</div>
        {brand? <div className={styles.brand}>Brand: {brand}</div>: null}
        {category? <div  className={styles.category}>Category: {category}</div>: null}
      </section>
    </div>
  );
};

export default ProductCard;
