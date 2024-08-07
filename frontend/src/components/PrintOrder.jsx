import React from 'react';
import { Button } from 'react-bootstrap'; // Importing the Button component

const PrintOrder = ({ order, gst1, gst2, gst3 }) => {
  const calculateGST = (total) => {
    return total + (total * gst1 / 100) + (total * gst2 / 100) + (total * gst3 / 100);
  };

  const totalWithGST = calculateGST(order.totalPrice);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=300,height=200');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 1cm;
              box-sizing: border-box;
            }
            .print-content {
              font-size: 10px;
            }
            .print-content h1 {
              font-size: 14px;
            }
            .print-content h2 {
              font-size: 12px;
            }
            .print-content div {
              margin-bottom: 5px;
            }
            hr {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            <h1>Restaurant Name</h1>
            <p>Address: 1234 Street, City, State, Zip</p>
            <p>Contact: (123) 456-7890, email@example.com</p>
            <hr />
            <h2>Order Summary</h2>
            ${order.items.map(item => `<div>${item.name} <span style="float: right">$${item.price}</span></div>`).join('')}
            <hr />
            <div>GST 1: <span style="float: right">${gst1}%</span></div>
            <div>GST 2: <span style="float: right">${gst2}%</span></div>
            <div>GST 3: <span style="float: right">${gst3}%</span></div>
            <hr />
            <h2>Total: <span style="float: right">$${totalWithGST.toFixed(2)}</span></h2>
            <button onclick="window.print()">Print</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      <Button onClick={handlePrint}>Open Print Window</Button>
    </div>
  );
};

export default PrintOrder;
