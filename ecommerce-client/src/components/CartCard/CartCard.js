import styles from './CartCard.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartCard = ({ productData, quantity, handleQuantityChange, removeProduct }) => {
	return (
		<div className={styles.container}>
			<div className={styles.leftContent}>
				<div className={styles.imageWrapper}>
					<Link to={`/product/${productData.productId}`}>
						<img src={productData?.image} className={styles.image} alt='' />
					</Link>
				</div>

				<div className={styles.info}>
					<h2 className={styles.title}>
						<Link to={`/product/${productData.productId}`}>{productData?.name}</Link>
					</h2>
					<div className={styles.description}>{productData?.description}</div>
				</div>
			</div>

			<div className={styles.actions}>
				<div className={styles.price}>{`${productData?.price.toLocaleString()}$`}</div>

				<input
					type='number'
					className={styles.quantity}
					value={quantity}
					onKeyDownCapture={(e) => e.preventDefault()}
					onPaste={(e) => e.preventDefault()}
					min={1}
					max={100}
					onChange={handleQuantityChange}
					autoComplete='none'
				/>
				<button className={styles.removeBtn} onClick={removeProduct}>
					<FaTrashAlt size={22} />
				</button>
			</div>
		</div>
	);
};

export default CartCard;
