import React from "react";
import { Carousel } from 'antd';

const ImageSlider = props => {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((item, index) => (
                    <div key={item}>
                        <img style={{width: '100%', maxHeight: '150px'}} src={`http://localhost:5000/${item}`}
                             alt="productImage"/>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageSlider;