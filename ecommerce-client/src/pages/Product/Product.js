import styles from './Product.module.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import placeholderImage from '../../assets/images/placeholder.png';
import { addToCart, getProductData } from '../../utils/api';
import { UserContext } from '../../context/UserContext';
import { NotificationManager } from 'react-notifications';

const Product = () => {
	const { productId } = useParams();
	const [productInfo, setProductInfo] = useState();
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			const response = await getProductData(productId);
			setProductInfo(response.data);
		}

		fetchData();
	}, [productId]);

	const handleAdd = () => {
		NotificationManager.success(`Successfully added ${productInfo?.name}`, 'Added product!', 500);
		addToCart(user.uId, productInfo);
	};

	if (productInfo) {
		return (
			<>
				<div className={styles.container}>
					<div className={styles.images}>
						<span className={styles.mainImage}>
							<img className={styles.mainImage} src={productInfo?.image || placeholderImage} alt='' />
						</span>
					</div>
					<div className={styles.info}>
						<h1 className={styles.title}>{productInfo?.name}</h1>
						<h2 className={styles.price}>{`${productInfo?.price.toLocaleString()}$`}</h2>
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
								<h4>category</h4>
								{productInfo?.categoryName}
							</div>
						</section>
						<button className={styles.addToCartBtn} onClick={handleAdd}>
							<FaShoppingCart />
							add to cart
						</button>
					</div>
				</div>
			</>
		);
	}
	return null;
};

export default Product;
