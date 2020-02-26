import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem, onSuccessPay } from "../../../_actions/user_actions";
import { Result, Empty } from "antd";
import UserCartBlock from "./Sections/UserCartBlock";
import Paypal from "../../helpers/Paypal";
import Axios from "axios";
import {USER_SERVER} from "../../Config";


const CartPage = props => {

    const {cartDetails, userData, userData: {cart}} = props.user;
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPaypal, setShowPaypal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        let cartItems = [];
        if (userData && cart) {
            if (cart.length > 0) {
                cart.forEach(item => {
                    cartItems.push(item.id);
                });
                dispatch(getCartItems(cartItems, cart));
            }
        }
    }, [userData]);

    useEffect(() => {
        if (cartDetails && cartDetails.length > 0) {
            totalAmount(cartDetails);
        }
    }, [cartDetails]);

    const totalAmount = (cartDetails) => {
        let total = 0;

        cartDetails.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        setTotal(total);
        setShowTotal(true);
        setShowPaypal(true);
    };

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(() => {
                if (cartDetails.length <= 1) {
                    setShowTotal(false);
                    setShowPaypal(false);
                } else {
                    totalAmount(cartDetails);
                }
            });
    };

    const transactionSuccess = (data) => {
        let config = {
            cartDetails,
            paymentData: data
        };

        Axios.post(`${USER_SERVER}/successPay`, config)
            .then(res => {
                if (res.data.success) {

                    const {cart, cartDetails} = res.data;

                    setShowSuccess(true);
                    setShowTotal(false);
                    setShowPaypal(false);

                    dispatch(onSuccessPay({
                        cart,
                        cartDetails
                    }));

                } else {
                    alert('Payment Failed!');
                }
            });
    };

    const transactionCancel = () => {
        console.log('transaction cancel');
    };

    const transactionError = () => {
        console.log('transaction error');
    };

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>
            <div>
                <UserCartBlock
                    products={cartDetails}
                    removeItem={removeFromCart}
                />

                {showTotal ? <div style={{marginTop: '3rem'}}>
                        <h2>Total amount: $ {total}</h2>
                    </div>
                    :
                    showSuccess ? <Result
                            status='success'
                            title='Successfully purchased items'
                        />
                        :
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}>
                            <br/>
                            <Empty description={false}/>
                            <p>No items in your cart</p>
                        </div>
                }
            </div>

            {/* Paypal Button */}
            {showPaypal ? <Paypal
                toPay={total}
                paySuccess={transactionSuccess}
                payCancel={transactionCancel}
                payError={transactionError}
            /> : null}

        </div>
    );
};

export default CartPage;