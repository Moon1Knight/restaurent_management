const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://zshadowknight7:dbRtEi0U0BrcvAaO@cluster1.wiycajo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
// Connect to MongoDB
mongoose.connect( MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
