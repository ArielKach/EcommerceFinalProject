import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { addOrder, getCart, getOrderSum } from "../../utils/api";
import styles from "./Order.module.css";
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";

const Order = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState("");
  const [order, setOrder] = useState([]);

  const fetchCart = async () => {
    const cart = await getCart(user.uId);
    if (cart && cart.data) {
      setOrder(cart.data);
    }

    if (totalPrice === "") {
      const price = await getOrderSum(user.uId);
      if (price && price.data) {
        setTotalPrice(price.data);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCart();
  }, []);

  const handleSubmit = () => {
    const productIds = order.map((product) => {
      return product.productId;
    });
    addOrder(user.uId, productIds, totalPrice);
    Swal.fire({
      title: `Ordered successfully`,
      confirmButtonText: "ok",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        navigate(0);
      }
    });
  };

  return isLoading ? (
    <div style={{ textAlign: "center", marginTop: "6rem" }}>
      <CircularProgress size={150} />
    </div>
  ) : (
    <div className={styles.orderPage}>
      <h1 className={styles.title}>Order Page</h1>
      <div className={styles.form}>
        {order.map((product) => (
          <div key={product.name}>
            <div className={styles.productContainer}>
              <img alt="" className={styles.image} src={product.image}></img>
              <div className={styles.detailsContainer}>
                <span>{product.name}</span>
                <span>Quantity: {product.quantity}</span>
              </div>
            </div>
            <br />
          </div>
        ))}
        <h2>Total Price: {totalPrice}$</h2>
        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Order;
