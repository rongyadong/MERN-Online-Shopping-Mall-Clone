import React from "react";

const UserCartBlock = props => {

    const {products} = props;

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    };

    const renderItems = products && products.map(product => (
        <tr key={product._id}>
            <td>
                <img
                    src={renderCartImage(product.images)}
                    style={{width: '70px'}}
                    alt='product img'/>
            </td>
            <td>
                {product.quantity} EA
            </td>
            <td>
                $ {product.price}
            </td>
            <td>
                <button>Remove</button>
            </td>
        </tr>
    ));


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Remove from Cart</th>
                </tr>
                </thead>
                <tbody>
                {renderItems}
                </tbody>
            </table>
        </div>
    );
};

export default UserCartBlock;