import styled from "styled-components";
import { useFeeedbackContext } from "../context/FeedbackContext";
import Loading from "./Loading";
import Error from "../pages/ErrorPage";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FEEDBACK_BEGIN, FEEDBACK_SUCESS, FEEDBACK_ERROR } from "../actions";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Feedback = () => {
  const {
    orderHashedValue,
    orderHash,
    authHashedValue,
    authHash,
    dispatch,
    statusCode,
    feedbackLoading,
    feedbackError,
  } = useFeeedbackContext();

  const status = statusCode.status_code;
  const order_tracking_id = Cookies.get("order_tracking_id");
  const pesapalToken = Cookies.get("pesapalToken");

  const navigate = useNavigate();

  if (orderHashedValue === orderHash && authHashedValue === authHash) {
    const fetch = () => {
      dispatch({ type: FEEDBACK_BEGIN });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${order_tracking_id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${pesapalToken}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          dispatch({ type: FEEDBACK_SUCESS, payload: response.data });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: FEEDBACK_ERROR });
        });
    };

    useEffect(() => {
      fetch();
    }, []);

    if (feedbackLoading) {
      return <Loading />;
    }

    if (feedbackError) {
      return <Error />;
    }

    if (status === 1) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
      return (
        <Wrapper className="page-100">
          <div className="container">
            <h3>
              Payment was successful. You are being redirected to the home page
              shortly. Thank you
            </h3>
          </div>
        </Wrapper>
      );
    }
    if (status !== 1) {
      return (
        <Wrapper className="page-100">
          <div className="container">
            <h3>Payment was unsuccessful. Please try again.</h3>
            <Link to="/products" className="btn payment-btn">
              Products
            </Link>
          </div>
        </Wrapper>
      );
    }
  } else {
    return (
      <Wrapper className="page-100">
        <div className="container">
          <h3>Page manipulated</h3>
          <Link to="/products" className="btn payment-btn">
            products
          </Link>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: 85vw;
  margin: auto;
  .container {
    margin-top: 70px;
  }
  .payment-btn {
    margin-top: 20px;
  }
  @media (max-width: 570px) {
    h3 {
      font-size: 1.1rem;
    }
  }
`;
export default Feedback;
