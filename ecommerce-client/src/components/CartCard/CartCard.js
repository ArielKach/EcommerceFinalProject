import styles from "./CartCard.module.css";
import {FaTrashAlt} from "react-icons/fa";
import {useState} from "react";
import {Link} from "react-router-dom";
import {getProductData} from "../../utils/api";


const CartCard = ({productId, quantity}) => {
    const [productData, _] = useState(
        getProductData(productId)
    );

    const handleQuantityChange = (e) => {
        const currentQuantity = Number(e.target.value);

    };


    return (
        <div className={styles.container}>
            <div className={styles.leftContent}>
                <div className={styles.imageWrapper}>
                    <Link to={`/product/${productId}`}>
                        <img src={productData?.imageUrl} className={styles.image} alt=""/>
                    </Link>
                </div>

                <div className={styles.info}>
                    <h2 className={styles.title}>
                        <Link to={`/product/${productId}`}>{productData?.title}</Link>
                    </h2>
                    <div className={styles.description}>{productData?.description}</div>
                </div>
            </div>

            <div className={styles.actions}>
                <div
                    className={styles.price}
                >{`${productData?.price.toLocaleString()}$`}</div>

                <input
                    type="number"
                    className={styles.quantity}
                    value={quantity}
                    onKeyDownCapture={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    min={1}
                    max={100}
                    onChange={handleQuantityChange}
                    onKeyDown={() => {
                    }}
                    autoComplete="none"
                />
                <button
                    className={styles.removeBtn}
                    onClick={() => {
                    }}
                >
                    <FaTrashAlt size={22}/>
                </button>
            </div>
        </div>
    );
};

export default CartCard;
