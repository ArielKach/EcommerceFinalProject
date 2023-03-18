import styles from "./Product.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import placeholderImage from "../../assets/images/placeholder.png";
import { getProductData } from "../../utils/api";

const Product = () => {
  const { productId } = useParams();
  const [productInfo, _] = useState(
    getProductData(Number(productId))
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addToCart = () => {
    const id = Number(productId);
    alert(`${productInfo?.title} added to cart`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.images}>
          <span className={styles.mainImage}>
            <img
              className={styles.mainImage}
              src={productInfo?.images[selectedImageIndex] || placeholderImage}
              alt=""
            />
          </span>
          <ul className={styles.moreImages}>
            {productInfo?.images.map((imageSrc, index) => (
              <li
                key={`image-no-${index}`}
                onClick={() => {
                  setSelectedImageIndex(index);
                }}
              >
                <img src={imageSrc} alt="" />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{productInfo?.title}</h1>
          <h2
            className={styles.price}
          >{`${productInfo?.price.toLocaleString()}$`}</h2>
          <section className={styles.moreInfo}>
            <div>
              <h4>description</h4>
              {productInfo?.description}
            </div>
            <div>
              <h4>brand</h4>
              {productInfo?.brand}
            </div>
            <div>
              <h4>upload date</h4>
              {productInfo?.uploadedDate.toLocaleDateString()}
            </div>
          </section>
          <button className={styles.addToCartBtn} onClick={() => addToCart()}>
            <FaShoppingCart />
            add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
