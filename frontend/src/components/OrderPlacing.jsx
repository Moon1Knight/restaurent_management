

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderPlacing = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState({ tableNumber: '', items: [] });
  const [orderSummary, setOrderSummary] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // Manually adjustable GST variable
  const gst = 5; // Set GST value here

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const result = await axios.get('http://localhost:5000/menu');
    setMenu(result.data);
  };

  const handleItemChange = (categoryIndex, itemIndex, isHalf) => {
    const item = menu[categoryIndex].items[itemIndex];
    const updatedItems = order.items.filter(i => !(i.name === item.name && i.isHalf === isHalf));

    setOrder({
      ...order,
      items: [...updatedItems, { name: item.name, isHalf, price: isHalf ? item.priceHalf : item.priceFull }]
    });
  };

  const handleSubmitOrder = async () => {
    const totalPrice = calculateTotal();
    const orderData = { ...order, totalPrice: parseFloat(totalPrice) };

    try {
      await axios.post('http://localhost:5000/orders', orderData);
      setOrder({ tableNumber: '', items: [] });
      setOrderSummary([]);
      setShowSummary(false);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = order.items.reduce((total, item) => total + item.price, 0);
    const total = subtotal + (subtotal * gst / 100);
    return total.toFixed(2);
  };

  return (
    <div className="order-placing container mt-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <div className="mb-3">
        <label htmlFor="tableNumber" className="form-label">Table Number</label>
        <input
          type="text"
          className="form-control"
          id="tableNumber"
          value={order.tableNumber}
          onChange={(e) => setOrder({ ...order, tableNumber: e.target.value })}
          required
        />
      </div>
      {menu.map((cat, catIndex) => (
        <div key={catIndex} className="mb-4">
          <h2>{cat.category}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Half</th>
                <th>Full</th>
              </tr>
            </thead>
            <tbody>
              {cat.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleItemChange(catIndex, itemIndex, true)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleItemChange(catIndex, itemIndex, false)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button className="btn btn-primary" onClick={() => setShowSummary(true)}>Show Order Summary</button>
      {showSummary && (
        <div className="order-summary mt-4">
          <h3>Order Summary</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} ({item.isHalf ? 'Half' : 'Full'}) - ${item.price}</li>
            ))}
          </ul>
          <h4>GST: {gst}%</h4>
          <h4>Total: ${calculateTotal()}</h4>
          <button className="btn btn-success" onClick={handleSubmitOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderPlacing;

