// // import React, { useState, useEffect } from 'react';
// // import { Modal, Button, Form } from 'react-bootstrap';

// // const OrderView = () => {
// //     const [orders, setOrders] = useState([]);
// //     const [filteredOrders, setFilteredOrders] = useState([]);
// //     const [showPrintModal, setShowPrintModal] = useState(false);
// //     const [selectedOrder, setSelectedOrder] = useState(null);
// //     const [isPaid, setIsPaid] = useState(false);
// //     const [paymentMode, setPaymentMode] = useState('');
// //     const [filter, setFilter] = useState('Show All');

// //     useEffect(() => {
// //         // Fetch orders from the database and set them to orders state
// //         fetch('http://localhost:5000/orders')
// //             .then(response => response.json())
// //             .then(data => {
// //                 setOrders(data);
// //                 setFilteredOrders(data);
// //             });
// //     }, []);

// //     useEffect(() => {
// //         applyFilter();
// //     }, [filter, orders]);

// //     const applyFilter = () => {
// //         let filtered = [...orders];
// //         const today = new Date();
// //         today.setHours(0, 0, 0, 0);

// //         if (filter === 'Today') {
// //             filtered = filtered.filter(order => new Date(order.createdAt).setHours(0, 0, 0, 0) === today.getTime());
// //         } else if (filter === 'Yesterday') {
// //             const yesterday = new Date(today);
// //             yesterday.setDate(yesterday.getDate() - 1);
// //             filtered = filtered.filter(order => new Date(order.createdAt).setHours(0, 0, 0, 0) === yesterday.getTime());
// //         } else if (filter === 'Less than 30 days') {
// //             const thirtyDaysAgo = new Date(today);
// //             thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
// //             filtered = filtered.filter(order => new Date(order.createdAt) >= thirtyDaysAgo);
// //         } else if (filter === 'More than 30 days') {
// //             const thirtyDaysAgo = new Date(today);
// //             thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
// //             filtered = filtered.filter(order => new Date(order.createdAt) < thirtyDaysAgo);
// //         }

// //         setFilteredOrders(filtered);
// //     };

// //     const handlePrint = (order) => {
// //         setSelectedOrder(order);
// //         setShowPrintModal(true);
// //     };

// //     const handlePrintModalClose = () => setShowPrintModal(false);

// //     const handlePrintModalSubmit = () => {
// //         // Handle the payment status and mode
// //         console.log('Bill Paid:', isPaid);
// //         console.log('Payment Mode:', paymentMode);
// //         setShowPrintModal(false);
// //         // Trigger print action here
// //         window.print(); // This will trigger the print dialog
// //     };

// //     return (
// //         <div>
// //             {/* Filter Dropdown */}
// //             <div className="filters mb-4">
// //                 <Form.Group controlId="filterDropdown">
// //                     <Form.Label>Filter Orders</Form.Label>
// //                     <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
// //                         <option>Show All</option>
// //                         <option>Today</option>
// //                         <option>Yesterday</option>
// //                         <option>Less than 30 days</option>
// //                         <option>More than 30 days</option>
// //                     </Form.Control>
// //                 </Form.Group>
// //             </div>

// //             {/* Orders */}
// //             <div className="orders">
// //                 {filteredOrders.map((order) => (
// //                     <div key={order._id} className="order-box mb-3 p-3 border">
// //                         <p><strong>Table Number:</strong> {order.tableNumber}</p>
// //                         <p><strong>Food Items:</strong> {order.items.map(item => `${item.name} (${item.isHalf ? 'Half' : 'Full'}) - $${item.price}`).join(', ')}</p>
// //                         <p><strong>Total Price:</strong> ${order.totalPrice}</p>
// //                         <Form.Check
// //                             type="checkbox"
// //                             label="Bill Paid"
// //                             checked={isPaid}
// //                             onChange={(e) => setIsPaid(e.target.checked)}
// //                         />
// //                         {isPaid && (
// //                             <Form.Group controlId="paymentMode">
// //                                 <Form.Label>Payment Mode</Form.Label>
// //                                 <Form.Control as="select" onChange={(e) => setPaymentMode(e.target.value)}>
// //                                     <option value="">Select Payment Mode</option>
// //                                     <option value="cash">Cash</option>
// //                                     <option value="online">Online</option>
// //                                 </Form.Control>
// //                             </Form.Group>
// //                         )}
// //                         <Button variant="primary" onClick={() => handlePrint(order)}>Print Receipt</Button>
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* Print Modal */}
// //             <Modal show={showPrintModal} onHide={handlePrintModalClose}>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>Print Receipt</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>
// //                     <Form>
// //                         <Form.Group>
// //                             <Form.Check 
// //                                 type="checkbox" 
// //                                 label="Bill Paid" 
// //                                 checked={isPaid} 
// //                                 onChange={(e) => setIsPaid(e.target.checked)}
// //                             />
// //                             {isPaid && (
// //                                 <Form.Group controlId="paymentMode">
// //                                     <Form.Label>Payment Mode</Form.Label>
// //                                     <Form.Control as="select" onChange={(e) => setPaymentMode(e.target.value)}>
// //                                         <option value="">Select Payment Mode</option>
// //                                         <option value="cash">Cash</option>
// //                                         <option value="online">Online</option>
// //                                     </Form.Control>
// //                                 </Form.Group>
// //                             )}
// //                         </Form.Group>
// //                     </Form>
// //                 </Modal.Body>
// //                 <Modal.Footer>
// //                     <Button variant="secondary" onClick={handlePrintModalClose}>Close</Button>
// //                     <Button variant="primary" onClick={handlePrintModalSubmit}>Print</Button>
// //                 </Modal.Footer>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default OrderView;
// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const OrderView = () => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [showPrintModal, setShowPrintModal] = useState(false);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [isPaid, setIsPaid] = useState(false);
//     const [paymentMode, setPaymentMode] = useState('');
//     const [filter, setFilter] = useState('Show All');

//     useEffect(() => {
//         // Fetch orders from the database and set them to orders state
//         fetch('http://localhost:5000/orders')
//             .then(response => response.json())
//             .then(data => {
//                 setOrders(data);
//                 setFilteredOrders(data);
//             });
//     }, []);

//     useEffect(() => {
//         applyFilter();
//     }, [filter, orders]);

//     const applyFilter = () => {
//         let filtered = [...orders];
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         if (filter === 'Today') {
//             filtered = filtered.filter(order => new Date(order.createdAt).setHours(0, 0, 0, 0) === today.getTime());
//         } else if (filter === 'Yesterday') {
//             const yesterday = new Date(today);
//             yesterday.setDate(yesterday.getDate() - 1);
//             filtered = filtered.filter(order => new Date(order.createdAt).setHours(0, 0, 0, 0) === yesterday.getTime());
//         } else if (filter === 'Less than 30 days') {
//             const thirtyDaysAgo = new Date(today);
//             thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//             filtered = filtered.filter(order => new Date(order.createdAt) >= thirtyDaysAgo);
//         } else if (filter === 'More than 30 days') {
//             const thirtyDaysAgo = new Date(today);
//             thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//             filtered = filtered.filter(order => new Date(order.createdAt) < thirtyDaysAgo);
//         }

//         setFilteredOrders(filtered);
//     };

//     const handlePrint = (order) => {
//         setSelectedOrder(order);
//         setShowPrintModal(true);
//     };

//     const handlePrintModalClose = () => setShowPrintModal(false);

//     const handlePrintModalSubmit = () => {
//         // Handle the payment status and mode
//         console.log('Bill Paid:', isPaid);
//         console.log('Payment Mode:', paymentMode);
        
//         // Print logic
//         const printWindow = window.open('', '', 'height=600,width=800');
//         printWindow.document.write('<html><head><title>Print</title>');
//         printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>'); // Add styles for printing
//         printWindow.document.write('</head><body>');
//         printWindow.document.write('<h1>Order Receipt</h1>');
//         printWindow.document.write(`<p><strong>Table Number:</strong> ${selectedOrder.tableNumber}</p>`);
//         printWindow.document.write(`<p><strong>Food Items:</strong> ${selectedOrder.items.map(item => `${item.name} (${item.isHalf ? 'Half' : 'Full'}) - $${item.price}`).join(', ')}</p>`);
//         printWindow.document.write(`<p><strong>Total Price:</strong> $${selectedOrder.totalPrice}</p>`);
//         if (isPaid) {
//             printWindow.document.write(`<p><strong>Payment Mode:</strong> ${paymentMode}</p>`);
//         }
//         printWindow.document.write('</body></html>');
//         printWindow.document.close();
//         printWindow.focus();
//         printWindow.print();
        
//         setShowPrintModal(false);
//     };

//     return (
//         <div>
//             {/* Filter Dropdown */}
//             <div className="filters mb-4">
//                 <Form.Group controlId="filterDropdown">
//                     <Form.Label>Filter Orders</Form.Label>
//                     <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
//                         <option>Show All</option>
//                         <option>Today</option>
//                         <option>Yesterday</option>
//                         <option>Less than 30 days</option>
//                         <option>More than 30 days</option>
//                     </Form.Control>
//                 </Form.Group>
//             </div>

//             {/* Orders */}
//             <div className="orders">
//                 {filteredOrders.map((order) => (
//                     <div key={order._id} className="order-box mb-3 p-3 border">
//                         <p><strong>Table Number:</strong> {order.tableNumber}</p>
//                         <p><strong>Food Items:</strong> {order.items.map(item => `${item.name} (${item.isHalf ? 'Half' : 'Full'}) - $${item.price}`).join(', ')}</p>
//                         <p><strong>Total Price:</strong> ${order.totalPrice}</p>
//                         <Form.Check
//                             type="checkbox"
//                             label="Bill Paid"
//                             checked={isPaid}
//                             onChange={(e) => setIsPaid(e.target.checked)}
//                         />
//                         {isPaid && (
//                             <Form.Group controlId="paymentMode">
//                                 <Form.Label>Payment Mode</Form.Label>
//                                 <Form.Control as="select" onChange={(e) => setPaymentMode(e.target.value)}>
//                                     <option value="">Select Payment Mode</option>
//                                     <option value="cash">Cash</option>
//                                     <option value="online">Online</option>
//                                 </Form.Control>
//                             </Form.Group>
//                         )}
//                         <Button variant="primary" onClick={() => handlePrint(order)}>Print Receipt</Button>
//                     </div>
//                 ))}
//             </div>

//             {/* Print Modal */}
//             <Modal show={showPrintModal} onHide={handlePrintModalClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Print Receipt</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group>
//                             <Form.Check 
//                                 type="checkbox" 
//                                 label="Bill Paid" 
//                                 checked={isPaid} 
//                                 onChange={(e) => setIsPaid(e.target.checked)}
//                             />
//                             {isPaid && (
//                                 <Form.Group controlId="paymentMode">
//                                     <Form.Label>Payment Mode</Form.Label>
//                                     <Form.Control as="select" onChange={(e) => setPaymentMode(e.target.value)}>
//                                         <option value="">Select Payment Mode</option>
//                                         <option value="cash">Cash</option>
//                                         <option value="online">Online</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             )}
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handlePrintModalClose}>Close</Button>
//                     <Button variant="primary" onClick={handlePrintModalSubmit}>Print</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default OrderView;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Modal, Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const OrderView = () => {
//   const [orders, setOrders] = useState([]);
//   const [showMenuModal, setShowMenuModal] = useState(false);
//   const [menu, setMenu] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     fetchOrders();
//     fetchMenu();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const result = await axios.get('http://localhost:5000/orders');
//       setOrders(result.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const fetchMenu = async () => {
//     try {
//       const result = await axios.get('http://localhost:5000/menu');
//       setMenu(result.data);
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//     }
//   };

//   const handleOrderSelect = (order) => {
//     setSelectedOrder(order);
//     setOrderItems(order.items);
//     calculateTotal(order.items);
//     setShowMenuModal(true);
//   };

//   const calculateTotal = (items) => {
//     const total = items.reduce((acc, item) => {
//       const itemPrice = item.isHalf ? item.priceHalf : item.priceFull;
//       return acc + itemPrice;
//     }, 0);
//     setTotalPrice(total);
//   };

//   const handleMenuModalClose = () => {
//     setShowMenuModal(false);
//     setOrderItems([]);
//   };

//   const handleAddItemToOrder = (item) => {
//     const updatedItems = [...orderItems, item];
//     setOrderItems(updatedItems);
//     calculateTotal(updatedItems);
//   };

//   const handleSubmitEdit = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/orders/${selectedOrder._id}`, {
//         items: orderItems,
//         totalPrice: totalPrice
//       });
//       fetchOrders();
//       handleMenuModalClose();
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Order View</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Table Number</th>
//             <th>Order Summary</th>
//             <th>Total Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order._id}>
//               <td>{order.tableNumber}</td>
//               <td>
//                 {order.items.map(item => (
//                   <div key={item._id}>
//                     {item.name} - {item.isHalf ? 'Half Portion' : 'Full Portion'} - ${item.isHalf ? item.priceHalf : item.priceFull}
//                   </div>
//                 ))}
//               </td>
//               <td>${order.totalPrice}</td>
//               <td>
//                 <Button variant="primary" onClick={() => handleOrderSelect(order)}>Edit</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showMenuModal} onHide={handleMenuModalClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Order</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             <h4>Selected Order</h4>
//             {orderItems.map((item, index) => (
//               <div key={index}>
//                 {item.name} - {item.isHalf ? 'Half Portion' : 'Full Portion'} - ${item.isHalf ? item.priceHalf : item.priceFull}
//               </div>
//             ))}
//             <h4>Total Price: ${totalPrice}</h4>
//             <Button variant="secondary" onClick={handleMenuModalClose}>Close</Button>
//           </div>

//           <h4>Add Items to Order</h4>
//           {menu.map((cat, catIndex) => (
//             <div key={catIndex} className="mb-4">
//               <h5>{cat.category}</h5>
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>Food Name</th>
//                     <th>Half Price</th>
//                     <th>Full Price</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cat.items.map((item, itemIndex) => (
//                     <tr key={itemIndex}>
//                       <td>{item.name}</td>
//                       <td>${item.priceHalf}</td>
//                       <td>${item.priceFull}</td>
//                       <td>
//                         <Button variant="primary" className="me-2" onClick={() => handleAddItemToOrder({
//                           ...item,
//                           isHalf: true,
//                           isFull: false
//                         })}>
//                           Add Half
//                         </Button>
//                         <Button variant="primary" onClick={() => handleAddItemToOrder({
//                           ...item,
//                           isHalf: false,
//                           isFull: true
//                         })}>
//                           Add Full
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           ))}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleMenuModalClose}>Close</Button>
//           <Button variant="primary" onClick={handleSubmitEdit}>Save Changes</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default OrderView;




// {new code here }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrintOrder from './PrintOrder';

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showMerge, setShowMerge] = useState(false);
  const [gst1, setGst1] = useState(0);
  const [gst2, setGst2] = useState(0);
  const [gst3, setGst3] = useState(0);
  const [printOrder, setPrintOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await axios.get('http://localhost:5000/orders');
      setOrders(result.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0);
  };

  const calculateGST = (total) => {
    return total + (total * gst1 / 100) + (total * gst2 / 100) + (total * gst3 / 100);
  };

  const handlePrint = (order) => {
    setPrintOrder(order);
  };

  const handleMerge = async () => {
    const mergedItems = selectedOrders.flatMap(order => order.items);
    const mergedOrder = {
      tableNumber: 'Merged',
      items: mergedItems,
      totalPrice: calculateTotal(mergedItems)
    };
    try {
      await axios.post('http://localhost:5000/orders', mergedOrder);
      selectedOrders.forEach(async order => {
        await axios.delete(`http://localhost:5000/orders/${order._id}`);
      });
      fetchOrders();
      setShowMerge(false);
      setSelectedOrders([]);
    } catch (error) {
      console.error('Error merging orders:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Order View</h1>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => setShowMerge(!showMerge)}>Merge Orders</Button>
        </Col>
        <Col>
          <Form>
            <Form.Group controlId="gst1">
              <Form.Label>GST 1 (%)</Form.Label>
              <Form.Control type="number" value={gst1} onChange={e => setGst1(Number(e.target.value))} />
            </Form.Group>
            <Form.Group controlId="gst2">
              <Form.Label>GST 2 (%)</Form.Label>
              <Form.Control type="number" value={gst2} onChange={e => setGst2(Number(e.target.value))} />
            </Form.Group>
            <Form.Group controlId="gst3">
              <Form.Label>GST 3 (%)</Form.Label>
              <Form.Control type="number" value={gst3} onChange={e => setGst3(Number(e.target.value))} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{showMerge && <Form.Check type="checkbox" onClick={() => setSelectedOrders(orders)} />}</th>
            <th>Table Number</th>
            <th>Order Summary</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{showMerge && <Form.Check type="checkbox" onChange={e => {
                const checked = e.target.checked;
                if (checked) {
                  setSelectedOrders([...selectedOrders, order]);
                } else {
                  setSelectedOrders(selectedOrders.filter(o => o._id !== order._id));
                }
              }} />}</td>
              <td>{order.tableNumber}</td>
              <td>
                {order.items.map(item => (
                  <div key={item._id}>
                    {item.name} - ${item.price}
                  </div>
                ))}
              </td>
              <td>${calculateGST(order.totalPrice).toFixed(2)}</td>
              <td>
                <Button variant="primary" onClick={() => handlePrint(order)}>Print</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showMerge && (
        <Button variant="success" onClick={handleMerge}>Merge Selected Orders</Button>
      )}
      {printOrder && (
        <PrintOrder order={printOrder} gst1={gst1} gst2={gst2} gst3={gst3} />
      )}
    </div>
  );
};

export default OrderView;
