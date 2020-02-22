import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from "../../helpers/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key: 1, value: 'Australia'},
    {key: 2, value: 'Europe'},
    {key: 3, value: 'Asia'},
    {key: 4, value: 'North America'},
    {key: 5, value: 'South America'},
    {key: 6, value: 'Africa'},
    {key: 7, value: 'Antarctica'},
];

const UploadProductPage = props => {

    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);
    const [continentValue, setContinentValue] = useState(1);

    const [images, setImages] = useState([]);

    const onTitleValueChange = e => {
        setTitleValue(e.currentTarget.value);
    };

    const onDescriptionValueChange = e => {
        setDescriptionValue(e.currentTarget.value);
    };

    const onPriceValueChange = e => {
        setPriceValue(e.currentTarget.value);
    };

    const onContinentsValueChange = e => {
        setContinentValue(e.currentTarget.value);
    };

    // get the child image state and update the parent one
    const updateImages = newImages => {
        setImages(newImages);
    };

    const onSubmit = e => {
        e.preventDefault();

        // basic form check validation
        if(!titleValue || !descriptionValue || !priceValue || !continentValue || !images){
            alert('Please fill all fields first');
        }

        // the HTTP request payload data based on the Product model in the Node server
        const Data = {
            writer: props.user.userData._id,
            title: titleValue,
            description: descriptionValue,
            price: priceValue,
            images: images,
            continents: continentValue
        };

        // send HTTP request to backend
        // this API should be in the Product controller - routes in the Node server
        Axios.post('/api/product/uploadProduct', Data)
            .then(res => {
                if (res.data.success) {
                    alert('Product Successfully uploaded');
                    props.history.push('/');

                } else {
                    alert('Failed to upload Product');
                }
            });
    };

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form onSubmit={onSubmit}>

                {/* DropZone */}
                <FileUpload
                    refreshFunction={updateImages}
                />

                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleValueChange}
                    value={titleValue}
                />

                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionValueChange}
                    value={descriptionValue}
                />

                <br/>
                <br/>
                <label>Price($)</label>
                <Input
                    onChange={onPriceValueChange}
                    value={priceValue}
                    type='number'
                />

                <br/>
                <br/>
                <select onChange={onContinentsValueChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>

                <br/>
                <br/>
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;