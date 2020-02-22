import React, {useState} from "react";
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from "axios";

const FileUpload = props => {

    // many images so that use intial state as an Array
    // also we need to add this state to the parent component to send in the same form
    const [images, setImages] = useState([]);

    const onDrop = files => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        };
        formData.append('file', files[0]);

        // save the Image we chose inside the Node Server
        Axios.post('/api/product/uploadImage', formData, config)
            .then(res => {
                if (res.data.success) {
                    setImages([...images, res.data.image]);
                    props.refreshFunction([...images, res.data.image]);
                } else {
                    alert('Failed to save the Image in Server');
                }
            });
    };

    const onDeleteImage = (image) => {
        let newImages = images.filter(item => item !== image);
        setImages(newImages);
        props.refreshFunction(newImages);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({getRootProps, getInputProps}) => (
                    <div style={{
                        width: '300px',
                        height: '240px',
                        border: '1px solid lightgray',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                         {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize: '3rem'}}/>
                    </div>
                )}
            </Dropzone>

            <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {images.map((item, index) => (
                    <div key={item} onClick={() => onDeleteImage(item)}>
                        <img style={{minWidth: '300px', width: '300px', height: '240px'}}
                             src={`http://localhost:5000/${item}`}
                             alt={`productImg-${index}`}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
