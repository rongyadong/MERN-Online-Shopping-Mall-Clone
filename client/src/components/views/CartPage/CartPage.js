import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import { Result, Empty } from "antd";
import UserCartBlock from "./Sections/UserCartBlock";


const CartPage = props => {

    const {userData, cartDetails} = props.user;
    const {cart} = userData;
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        let carItems = [];

        if (userData && cart) {
            if (cart.length > 0) {
                cart.forEach(item => carItems = [...carItems, item.id]);
            }
            dispatch(getCartItems(carItems, cart));
        }

    }, [userData, cart]);

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
    };

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>
            <div>
                <UserCartBlock
                    products={cartDetails}
                />
                <div style={{marginTop: '3rem'}}>
                    <h2>Total amount: $ {total}</h2>
                </div>

                <Result
                    status='success'
                    title='Successfully purchased items'
                />

                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <br/>
                    <Empty description={false}/>
                    <p>No items in your cart</p>
                </div>

            </div>

            {/* Paypal Button */}

        </div>
    );
};

export default CartPage;