import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from "../../helpers/FileUpload";

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

const UploadProductPage = () => {

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
        console.table(newImages);
    };

    const onSubmit = e => {
        e.preventDefault();
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