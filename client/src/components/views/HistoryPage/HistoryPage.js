import React, { useState, useEffect } from "react";
import Axios from "axios";

const HistoryPage = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        Axios.get('/api/users/history')
            .then((res) => {
                if (res.data.success) {
                    setHistory(res.data.history);
                } else {
                    alert('Failed to get the history data!');
                }
            });
    }, []);

    const renderItems = history && history.map(item => (
        <tr key={item.id}>
            <td>{item.paymentId}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.dateOfPurchase}</td>
        </tr>
    ));

    return (
        <div style={{width: '80%', margin: '3rem auto '}}>
            <div style={{textAlign: 'center'}}>
                <h1>History</h1>
            </div>
            <br/>
            <table>
                <thead>
                <tr>
                    <th>Payment Id</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Date of Purchase</th>
                </tr>
                </thead>
                <tbody>
                {renderItems}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryPage;