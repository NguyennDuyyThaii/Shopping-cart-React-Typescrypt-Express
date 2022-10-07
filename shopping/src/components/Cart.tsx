import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {useEffect} from 'react'
import { decreaseCartQuantity, removeFromCart, increaseCartQuantity, cleanCart, calculateSubtotal } from "../features/cartsSlice";
const Cart = () => {
  const cart = useSelector((state: any) => state.carts);
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  handleRemoveFromCart = (cart:any) => {
    dispatch(removeFromCart(cart))
  }

  const handleDecreaseCartQuantity = (cart: any) => {
    dispatch(decreaseCartQuantity(cart))
  }
  // or call agian addToCart
  const handleIncreaseCartQuantity = (cart: any) => {
    dispatch(increaseCartQuantity(cart))
  }

  const handleClearCart = () => {
    dispatch(cleanCart(null))
  }

  useEffect(() => {
    dispatch(calculateSubtotal(0))
  }, [cart, dispatch])
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="">
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems.map((item: any) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-product">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                      <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-product-price">${item.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCartQuantity(item)}>-</button>
                    <div className="count">{item.cartQuantity}</div>
                    <button onClick={() => handleIncreaseCartQuantity(item)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${item.price * item.cartQuantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Texes and shipping calculated at checkout</p>
                {auth._id ? (<button className="cart-checkout">Checkout</button>): (<button className="cart-login" onClick={() => navigate('/login')}>Login to checkout</button>)}
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
