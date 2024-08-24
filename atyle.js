// Sample product data
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const products = [
    { id: 1, name: 'Product 1', price: 10.00, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20.00, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30.00, image: 'https://via.placeholder.com/150' },
    { id: 1, name: 'Product 1', price: 10.00, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20.00, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30.00, image: 'https://via.placeholder.com/150' },
];

const cart = [];

// Function to display products
function displayProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    const cartCount = document.getElementById('cartCount');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalAmount.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}
const mongoose = require('mongoose');

const Car = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);

const express = require('express');
const bodyParser = require('body-parser');

const ap = express();
const por = 3000;

// Middleware to parse form data
ap.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML file)
ap.use(express.static('public'));

// Route to handle form submission
ap.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    res.send('Form submitted successfully!');
});

// Start the server
ap.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// Initialize the app
displayProducts();const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./cartRoutes');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Use cart routes
ap.use('/api/cart', cartRoutes);

ap.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;         

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for the Cart
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: Number
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

// Add to Cart endpoint
app.post('/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).send('Missing required fields.');
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if one doesn't exist for this user
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      // Item already in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item not in cart, add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).send('Item added to cart.');
  } catch (error) {
    res.status(500).send('Internal Server Error.');
  }
});

//Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


