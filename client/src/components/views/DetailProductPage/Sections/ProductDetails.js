import React, { useState, useEffect } from "react";
import { Descriptions, Button } from 'antd';

const ProductDetails = props => {

    const {details} = props;

    const [product, setProduct] = useState({});

    const {price, sold, views, description} = product;

    useEffect(() => {
        setProduct(details);
    }, [details]);

    const handleAddToCart = () => {

    };

    return (
        <div>
            <Descriptions title='Product Detail'>
                <Descriptions.Item label='Price'>{price}</Descriptions.Item>
                <Descriptions.Item label='Sold'>{sold}</Descriptions.Item>
                <Descriptions.Item label='Views'>{views}</Descriptions.Item>
                <Descriptions.Item label='Description'>{description}</Descriptions.Item>
            </Descriptions>
            <br/>
            <br/>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button size='large'
                        shape='round'
                        type='danger'
                        onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductDetails;