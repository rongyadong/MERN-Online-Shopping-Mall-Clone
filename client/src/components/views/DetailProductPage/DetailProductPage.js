import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import ProductImage from "./Sections/ProductImage";
import ProductDetails from "./Sections/ProductDetails";
import Axios from "axios";
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from "react-redux";

const DetailProductPage = props => {

    const {productId} = props.match.params;

    const [product, setProduct] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then((res) => {
                setProduct(res.data[0]);
            })
            .catch(err => alert(err));
    }, []);

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId));
    };

    return (
        <div className='postPage' style={{width: '100%', padding: '3rem 4rem'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>{product.title}</h1>
            </div>

            <br/>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage details={product}/>
                </Col>

                <Col lg={12} xs={24}>
                    <ProductDetails
                        details={product}
                        addToCart={handleAddToCart}
                    />
                </Col>
            </Row>

        </div>
    );
};

export default DetailProductPage;