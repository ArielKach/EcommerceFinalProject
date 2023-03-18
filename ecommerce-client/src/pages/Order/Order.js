import { useState } from "react";
import styles from "./Order.module.css";

const Order = (props) => {
  const [order, setOrder] = useState({
    products: [
      {
        itemName: "item1",
        quantity: 1,
        image:
          "https://files.geektime.co.il/wp-content/uploads/2022/03/unnamed-1646243666.jpg",
      },
      {
        itemName: "item2",
        quantity: 2,
        image:
          "https://files.geektime.co.il/wp-content/uploads/2022/03/unnamed-1646243666.jpg",
      },
      {
        itemName: "item3",
        quantity: 1,
        image:
          "https://files.geektime.co.il/wp-content/uploads/2022/03/unnamed-1646243666.jpg",
      },
    ],
    totalPrice: 50,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(order);
  };

  return (
    <div className={styles.orderPage}>
      <h1 className={styles.title}>Order Page</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {order.products.map((product) => (
          <div>
            <div className={styles.productContainer}>
              <img className={styles.image} src={product.image}></img>
              <div className={styles.detailsContainer}>
                <span>Item Name: {product.itemName}</span>
                <span>Quantity: {product.quantity}</span>
              </div>
            </div>
            <br />
          </div>
        ))}
        <h2>Total Price: {order.totalPrice}$</h2>
        <button type="submit" className={styles.submitButton}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Order;
