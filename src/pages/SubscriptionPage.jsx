import styled from "styled-components";
import { useProductsContext } from "../context/ProductsContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Error from "./ErrorPage";
import { useAuthContext } from "../context/AuthContext";
import { payment } from "../utils/constants";
import { FaLock, FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { useLocation } from "react-router-dom";

const SubscriptionPage = () => {
  const { dispatch } = useSubscriptionContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/subscription/:id") {
      dispatch({ type: UPDATE_SUBSCRIPTION });
    }
  }, [location, dispatch]);

  const {
    setSubscriptionValues,
    firstNames,
    lastNames,
    phone,
    checked,
    subscription_loading,
    subscription_error,
    subscription_url,
    checkSubscriptionValues,
    subscriptionError: {
      firstNamesError,
      lastNamesError,
      phoneError,
      checkedError,
    },
  } = useSubscriptionContext();
  const [isClicked, setIsClicked] = useState(false);
  const {
    single_product,
    single_products_error,
    single_products_loading,
    fetchSingleProduct,
  } = useProductsContext();
  const { first_name, _email } = useAuthContext();
  const link = "https://movies-api-vruc.onrender.com/products/";
  const { name, url, ammount, subText } = single_product;
  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(`${link}${id}`);
  }, [id]);

  if (single_products_loading) {
    return <Loading />;
  }
  if (single_products_error) {
    return <Error />;
  }
  if (subscription_loading) {
    return <Loading />;
  }
  if (subscription_error) {
    return <Error />;
  }
  if (subscription_url) {
    return (
      <div>
        <iframe
          src={subscription_url}
          width="85%"
          height="570px"
          name="iframe"
          title="iframe"
          style={{
            marginLeft: "5%",
            marginBottom: "30px",
            border: "none",
            minHeight: "calc(100vh)",
          }}
        ></iframe>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="header">
        <div className="header-container">
          <h3 className="header-subscription">
            Complete your <br /> Subscription
          </h3>
          <p className="subscription-paragraph">
            Pay with Mpesa/Airtel Money or Credit/Debit card
            <br />
            through our secure payment processing partner
            <br />
            Pesapal. (Regulated by Central Bank of Kenya)
          </p>
        </div>
        <div>
          <img src={url} alt={name} className="header-img" />
        </div>
      </div>
      <hr />
      <div className="body">
        <div className="variable-order">
          <div className="variable-container">
            <p className="variable-paragraph">
              {isClicked ? "Close Order Summary" : "Show Order Summary"}
            </p>
            <button
              type="button"
              className="variable-btn"
              onClick={() => setIsClicked(!isClicked)}
            >
              {isClicked ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
            </button>
          </div>
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div>
                  <h3 className="your-order-heading">Your order</h3>
                  <div className="order-container">
                    <div className="order">
                      <p className="order-right-paragraph">Product</p>
                      <div className="sub-container">
                        <img src={url} alt={name} className="order-img" />
                        <p className="sub-text">{subText}</p>
                      </div>
                      <p className="sub-total">Subtotal</p>
                      <p className="sub-total">Surcharge Fee</p>
                      <p className="sub-total">Total</p>
                    </div>
                    <div className="order">
                      <p className="order-left-paragraph">Subtotal</p>
                      <p className="sub">{subText}</p>
                      <p className="ammount">Ksh{ammount}</p>
                      <p className="ammount">Ksh0</p>
                      <p className="ammount">Ksh{ammount}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <h3 className="welcome-heading">Customer information</h3>
          <p className="body-paragraph">
            Welcome back {first_name} ({_email})
          </p>
          <h3 className="billing-details">Billing details</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-container">
              <div>
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="First Name"
                  name="firstNames"
                  className="subscription-input"
                  value={firstNames}
                  onChange={setSubscriptionValues}
                />
                <p className="error-paragraph">{firstNamesError}</p>
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="lastNames"
                  placeholder="Last Name"
                  className="subscription-input"
                  value={lastNames}
                  onChange={setSubscriptionValues}
                />
                <p className="error-paragraph">{lastNamesError}</p>
              </div>
            </div>
            <label htmlFor="phone">Phone number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="0745671868"
              className="subscription-input custom-number-input"
              value={phone}
              onChange={setSubscriptionValues}
              autoComplete="off"
            />
            <p className="error-paragraph">{phoneError}</p>
            <h3 className="payment">Payment</h3>
            <div className="payment-container">
              <div className="color-container">
                <p className="payment-paragraph">
                  Mpesa/Airtel &amp; Card payments{" "}
                </p>
                <div className="container">
                  {payment.map(({ id, url, name }) => {
                    return (
                      <div className="payment-image-container" key={id}>
                        <img src={url} alt={name} className="image" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="pesapal-container">
                pesapal <br />
                Pay using PesaPal Gateway, you can pay by either credit/debit
                card or use <br />
                payment option such as Mpesa, AirtelMoney, MTN Money…
              </p>
            </div>
            <p className="sub-heading">
              Your personal data will be used to process your order, support
              your experience
              <br />
              throughout this website, and for other purposes described in our
              <Link to="/privacypolicy"> privacy policy .</Link>
            </p>
            <div className="chebox-container">
              <input
                type="checkbox"
                className="input-checkbox"
                name="checked"
                checked={checked}
                onChange={setSubscriptionValues}
              />
              <p className="checkbox">
                I have read the website{" "}
                <Link to="/terms">terms and conditions </Link>*
              </p>
            </div>
            <p className="error-paragraph">{checkedError}</p>
            <button
              className="subscribe-btn"
              type="submit"
              onClick={checkSubscriptionValues}
            >
              <FaLock /> subscribe Kshs {ammount}
            </button>
          </form>
        </div>
        <div className="your-order">
          <h3 className="your-order-heading">Your order</h3>
          <div className="order-container">
            <div className="order">
              <p className="order-right-paragraph">Product</p>
              <div className="sub-container">
                <img src={url} alt={name} className="order-img" />
                <p className="sub-text">{subText}</p>
              </div>
              <p className="sub-total">Subtotal</p>
              <p className="sub-total">Surcharge Fee</p>
              <p className="sub-total">Total</p>
            </div>
            <div className="order">
              <p className="order-left-paragraph">Subtotal</p>
              <p className="sub">{subText}</p>
              <p className="ammount">Ksh{ammount}</p>
              <p className="ammount">Ksh0</p>
              <p className="ammount">Ksh{ammount}</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 95vw;
  margin: auto;
  background-color: #2c3333;
  margin-bottom: 50px;
  .subscription-paragraph {
    color: #ffffff;
  }
  a {
    color: #b632b4;
  }
  .group {
    min-height: calc(100vh - 10rem);
  }
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 20px 40px;
  }
  .header-img {
    width: 100%;
    display: block;
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: var(--radius);
  }
  hr {
    margin: 0 40px;
  }
  .header-container {
    padding: 70px 0 0;
  }
  .body {
    padding: 20px 40px;
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 2rem;
  }
  .body-paragraph {
    color: #ffffff;
  }
  .form-container {
    display: grid;
    grid-template-columns: auto auto;
  }
  .subscription-input {
    display: block;
    margin: 0.5rem 0;
    padding: 1rem;
    border: none;
    font-size: 0.9rem;
    border-radius: var(--radius);
    width: 90%;
    outline: none !important;
  }
  .payment-container {
    border: 1px solid #ffffff;
    border-radius: var(--radius);
    width: 95%;
  }
  .payment-paragraph {
    color: #ffffff;
  }
  .container {
    display: flex;
  }
  .image {
    width: 23px;
    height: 23px;
    object-fit: cover;
    border-radius: var(--radius);
    margin: 5px 6px 0 0;
  }
  .color-container {
    display: grid;
    grid-template-columns: 1fr auto;
    background-color: #71797e;
  }
  .pesapal-container {
    color: #ffffff;
    margin: 10px 0;
  }
  .sub-heading {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #ffffff;
  }
  .chebox-container {
    display: flex;
    align-items: center;
    text-align: center;
  }
  .checkbox {
    color: #ffffff;
    padding-left: 8px;
    margin-top: 20px;
  }
  .btn {
    display: block;
  }
  .subscribe-btn {
    text-transform: capitalize;
    background: #7100e2;
    color: #ffffff;
    padding: 0.375rem 0.75rem;
    display: block;
    font-weight: 400;
    transition: var(--transition);
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
    width: 50%;
  }
  .order-container {
    display: grid;
    grid-template-columns: auto auto;
    border: 1px solid #ffffff;
    border-radius: var(--radius);
  }
  .order-right-paragraph {
    color: #ffffff;
    text-align: left;
  }
  .order-left-paragraph {
    color: #ffffff;
    text-align: right;
  }
  .order {
    padding: 10px;
  }
  .order-img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: var(--radius);
  }
  .sub-container {
    display: grid;
    grid-template-columns: auto auto;
  }
  .sub-text {
    margin-top: 10px;
  }
  .sub {
    padding-top: 10px;
    text-align: right;
  }
  .sub-total {
    padding-top: 10px;
  }
  .ammount {
    padding-top: 10px;
    text-align: right;
  }
  .your-order {
    margin: auto;
  }
  .your-order-heading {
    text-align: center;
  }
  .variable-order {
    display: none;
    background-color: #71797e;
    padding: 30px 30px 10px;
  }

  .variable-container {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .variable-btn {
    background: transparent;
    border: transparent;
    margin-right: 10px;
    font-size: 1.4rem;
    color: #ffffff;
  }
  .variable-btn:hover {
    cursor: pointer;
  }
  .welcome-heading {
    margin-top: 20px;
  }
  .error-paragraph {
    color: red;
    text-transform: capitalize;
  }
  .custom-number-input::-webkit-inner-spin-button,
  .custom-number-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .custom-number-input:hover::-webkit-inner-spin-button,
  .custom-number-input:hover::-webkit-outer-spin-button {
    display: none;
  }

  @media (max-width: 1094px) {
    .form-container {
      display: block;
    }
    .subscribe-btn {
      font-size: 0.9rem;
    }
    .checkbox {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 1034px) {
    .checkbox {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 990px) {
    .body {
      display: block;
    }
    .your-order {
      display: none;
    }
    .variable-order {
      display: block;
    }
    .checkbox {
      font-size: 0.9rem;
    }
    .header {
      display: block;
    }
    .header-container {
      padding: 0;
    }
    .subscribe-btn {
      font-size: 1rem;
    }
  }
  @media (max-width: 590px) {
    .subscribe-btn {
      font-size: 0.9rem;
    }
    .checkbox {
      font-size: 0.75rem;
    }
    .sub-heading {
      font-size: 0.8rem;
    }
    .pesapal-container {
      font-size: 0.8rem;
    }
    .header-img {
      width: 180px;
      height: 180px;
    }
  }
  @media (max-width: 530px) {
    .header-subscription {
      font-size: 1.4rem;
    }
    .your-order-heading {
      font-size: 1.4rem;
    }
    .welcome-heading {
      font-size: 1.4rem;
    }
    .billing-details {
      font-size: 1.4rem;
    }
    .payment {
      font-size: 1.4rem;
    }
    .sub-text {
      margin-top: 0;
    }
    .sub {
      padding-top: 0;
    }
    .subscribe-btn {
      width: 70%;
    }
    .subscription-input {
      padding: 0.8rem;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 490px) {
    .subscribe-btn {
      font-size: 0.7rem;
    }
    .payment-paragraph {
      font-size: 0.8rem;
    }
    .subscription-paragraph {
      font-size: 0.8rem;
    }
    .order-right-paragraph {
      font-size: 0.75rem;
    }
    .sub-total {
      font-size: 0.75rem;
    }
    .sub-text {
      font-size: 0.75rem;
    }
    .order-left-paragraph {
      font-size: 0.75rem;
    }
    .sub {
      font-size: 0.75rem;
    }
    .ammount {
      font-size: 0.75rem;
    }
  }
  @media (max-width: 405px) {
    .header-img {
      width: 140px;
      height: 140px;
    }
    .order {
      padding: 3px;
    }
    .variable-order {
      padding: 0 10px 5px;
    }
    .image {
      width: 17px;
      height: 17px;
    }
    .input-checkbox {
      margin-top: 10px;
    }
    .checkbox {
      margin-top: 30px;
    }
    .payment-paragraph {
      font-size: 0.7rem;
    }
  }
`;
export default SubscriptionPage;
