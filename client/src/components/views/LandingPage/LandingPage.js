import React, { useState, useEffect } from 'react';
import { Icon, Button, Row, Col, Card } from 'antd';
import Axios from "axios";
import ImageSlider from "../../helpers/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents , price } from './Sections/FilterData';

const { Meta } = Card;

const LandingPage = () => {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [searchTerms, setSearchTerms] = useState('');
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

    const handlePriceFilter = (priceValue) => {
        const data = price;
        let arr = [];

        for(let key in data){
            // because the typeof priceValue from the RadioBox is string and should covert it to number
            if(data[key]._id === parseInt(priceValue,10)){
                arr = data[key].array
            }
        }
        return arr;
    };

    const handleFilters = (filtersValue, category) => {
        let newFilters = {...filters};
        newFilters[category] = filtersValue;

        setFilters(newFilters);

        if(category==='price'){
            let priceValue = handlePriceFilter(filtersValue);
            newFilters[category] = priceValue;
        }

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

    const updateSearchTerms = (newSearchTerm) => {
        const config = {
            skip: 0,
            limit,
            filters,
            searchTerm: newSearchTerm
        };

        setSkip(0);
        setSearchTerms(newSearchTerm);

        // AJAX.post with this condition to fetch data from the server side
        getProducts(config);
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

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox
                        filterList={continents}
                        handleFilters={filters => handleFilters(filters, 'continents')}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        filterList={price}
                        handleFilters={filters => handleFilters(filters, 'price')}
                    />
                </Col>
            </Row>

            {/*Search*/}

            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />
            </div>


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
