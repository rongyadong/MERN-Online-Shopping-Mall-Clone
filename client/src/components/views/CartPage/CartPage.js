import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import {getCartItems} from "../../../_actions/user_actions";


const CartPage = props => {

    const {userData} = props.user;
    const {cart} = userData;
    const dispatch = useDispatch();

    useEffect(() => {
        let carItems = [];

        if (userData && cart) {
            if (cart.length > 0) {
                cart.forEach(item => carItems = [...carItems, item.id]);
            }
            dispatch(getCartItems(carItems, cart));
        }

    }, [userData]);

    return (
        <div>
            CartPage
        </div>
    );
};

export default CartPage;