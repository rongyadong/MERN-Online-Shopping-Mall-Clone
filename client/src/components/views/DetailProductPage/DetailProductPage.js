import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import ProductImage from "./Sections/ProductImage";
import ProductDetails from "./Sections/ProductDetails";
import Axios from "axios";

const DetailProductPage = props => {

    const {productId} = props.match.params;

    const [product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then((res) => {
                setProduct(res.data[0]);
            })
            .catch(err => alert(err));
    }, []);

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
                    <ProductDetails details={product}/>
                </Col>
            </Row>

        </div>
    );
};

export default DetailProductPage;