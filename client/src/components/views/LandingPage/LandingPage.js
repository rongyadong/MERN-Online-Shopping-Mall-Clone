import React, { useState, useEffect } from 'react';
import { Icon, Button, Row, Col, Card } from 'antd';
import Axios from "axios";
import ImageSlider from "../../helpers/ImageSlider";

const { Meta } = Card;

function LandingPage() {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);

    useEffect(() => {
        // use the default value as the first time fetching data
        const config = {
            skip, // 0 - start index 0 to fetch data
            limit // 8 - each time plus 8 more
        };

        getProducts(config);
    }, []);

    const getProducts = (config) => {
        Axios.post('/api/product/getProducts', config)
            .then(res => {
                if (res.data.success) {
                    setProducts([...products, ...res.data.products]);
                    setPostSize(res.data.postSize);
                } else {
                    alert('Failed to fetch the product data');
                }
            });
    };

    const onLoadMore = () => {
        let nextLoad = skip + limit;

        const config = {
            skip: nextLoad,
            limit
        };

        getProducts(config);
        setSkip(nextLoad);
    };

    const renderCards = products.map((item, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={item._id}>
                <Card
                    hoverable={true}
                    cover={<a href={`/product/${item._id}`}> <ImageSlider images={item.images}/></a>}
                >
                    <Meta
                        title={item.title}
                        description={`$${item.price}`}
                    />
                </Card>
            </Col>
        );
    });

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's Travel Anyway <Icon type='rocket'/></h2>
            </div>

            {/*Filter*/}

            {/*Search*/}

            {products.length === 0 ?
                <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }

            <br/>
            <br/>
            {postSize >= limit && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={onLoadMore}>Load more</Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
