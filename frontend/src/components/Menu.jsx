import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimesCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ category: '', name: '', priceHalf: '', priceFull: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const result = await axios.get('http://localhost:5000/menu');
      setMenu(result.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/menu', { category: newItem.category, items: [{ name: newItem.name, priceHalf: newItem.priceHalf, priceFull: newItem.priceFull }] });
      fetchMenu();
      setShowAddForm(false);
      setNewItem({ category: '', name: '', priceHalf: '', priceFull: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/menu/${id}`);
      fetchMenu();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleStrikethrough = async (id, unavailable) => {
    try {
      await axios.put(`http://localhost:5000/menu/${id}`, { unavailable: !unavailable });
      fetchMenu();
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <div className="menu-background container mt-5">
      <h1 className="text-center mb-4">Menu</h1>
      {menu.map((cat, catIndex) => (
        <div key={catIndex} className="mb-4">
          <h2>{cat.category}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Half Price</th>
                <th>Full Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cat.items.map((item, itemIndex) => (
                <tr key={itemIndex} className={item.unavailable ? 'table-secondary' : ''}>
                  <td>{item.name}</td>
                  <td>${item.priceHalf}</td>
                  <td>${item.priceFull}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleStrikethrough(item._id, item.unavailable)}>
                      <FontAwesomeIcon icon={item.unavailable ? faCheckCircle : faTimesCircle} />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {showAddForm ? (
        <div className="mb-4">
          <h3>Add New Item</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Food Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priceHalf" className="form-label">Half Price</label>
              <input
                type="number"
                className="form-control"
                id="priceHalf"
                value={newItem.priceHalf}
                onChange={(e) => setNewItem({ ...newItem, priceHalf: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priceFull" className="form-label">Full Price</label>
              <input
                type="number"
                className="form-control"
                id="priceFull"
                value={newItem.priceFull}
                onChange={(e) => setNewItem({ ...newItem, priceFull: e.target.value })}
                required
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <button className="btn btn-primary mb-4" onClick={() => setShowAddForm(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add New Item
        </button>
      )}
    </div>
  );
};

export default Menu;
