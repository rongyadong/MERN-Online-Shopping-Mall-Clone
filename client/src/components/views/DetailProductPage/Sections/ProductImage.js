import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = props => {

    const {details} = props;
    const {images} = props.details;

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (images && images.length > 0) {
            let imageArray = [];

            images && images.map(item => {
                // imageArray.push({
                //     original: `http://localhost:5000/${item}`,
                //     thumbnail: `http://localhost:5000/${item}`
                // });

                imageArray = [...imageArray, {
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                }];
            });

            setItems(imageArray);
        }

    }, [details]);

    return (
        <div>
            <ImageGallery items={items}/>
        </div>
    );
};

export default ProductImage;