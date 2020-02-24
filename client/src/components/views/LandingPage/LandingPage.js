import React, { useState, useEffect } from 'react';
import { Icon, Button, Row, Col, Card } from 'antd';
import Axios from "axios";
import ImageSlider from "../../helpers/ImageSlider";
import CheckBox from "./Sections/CheckBox";

const { Meta } = Card;

const LandingPage = () => {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [filters, setFilters] = useState({
        continents: [],
        price: []
    });

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
                    if (config.loadMore) {
                        setProducts([...products, ...res.data.products]);
                    } else {
                        setProducts(res.data.products);
                    }
                    setPostSize(res.data.postSize);
                } else {
                    alert('Failed to fetch the product data');
                }
            });
    };

    const onLoadMore = () => {
        let nextLoad = skip + limit;

        const config = {
            loadMore: true,
            skip: nextLoad,
            limit
        };

        getProducts(config);
        setSkip(nextLoad);
    };

    const handleFilters = (filtersValue, catagory) => {
        let newFilters = {...filters};
        newFilters[catagory] = filtersValue;

        setFilters(newFilters);

        // use the new result to call the Axios.post function and get the new list in UI
        showFilterResults(newFilters);
    };

    const showFilterResults = (filterConditions) => {
        const config = {
            skip: 0, // start index 0 to fetch data
            limit,
            filterConditions
        };

        // send Axios.post to get the new list data with new conditions
        getProducts(config);
        setSkip(0);
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
            <CheckBox
                handleFilters={filters=>handleFilters(filters,'continents')}
            />

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
};

export default LandingPage;
