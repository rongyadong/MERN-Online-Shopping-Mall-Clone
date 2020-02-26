import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {...state, register: action.payload};
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload};
        case AUTH_USER:
            return {...state, userData: action.payload};
        case LOGOUT_USER:
            return {...state};
        case ADD_TO_CART_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            };
        case GET_CART_ITEMS_USER:
            return {...state, cartDetails: action.payload};
        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetails: action.payload.cartDetails
            };
        case ON_SUCCESS_BUY_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetails: action.payload.cartDetails
            };
        default:
            return state;
    }
}