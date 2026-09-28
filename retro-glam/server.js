var express = require("express");
var path = path = require("path");
var fs = require("fs");
var app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // <-- Added this line for images

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -----------------------------------------------------------
   DATASET 2 — Customer information (in-memory, like the sample)
----------------------------------------------------------- */
let customers = [
  { id: 1, firstname: 'Hannah', lastname: 'Reyes', age: 21, email: 'hannah.reyes@example.com' },
  { id: 2, firstname: 'Miguel', lastname: 'Santos', age: 24, email: 'miguel.santos@example.com' },
  { id: 3, firstname: 'Jasmine', lastname: 'Mendez', age: 19, email: 'jasmine.mendez@example.com' }
];

/* -----------------------------------------------------------
   DATASET 1 — Products, loaded from /public/data/products.json
----------------------------------------------------------- */
function loadProducts() {
  const filepath = path.join(__dirname, 'public/data/products.json');
  const raw = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(raw);
}

/* -----------------------------------------------------------
   PAGE ROUTES
----------------------------------------------------------- */
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'register.html'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'index.html'));
});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'register.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'login.html'));
});

app.get('/shop', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'shop.html'));
});

app.get('/features', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'features.html'));
});

app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'contact.html'));
});

app.get('/social-campaign', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'social-campaign.html'));
});

app.get('/email-campaign', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'email-campaign.html'));
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'profile.html'));
});

app.get('/edit-profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/pages', 'edit-profile.html'));
});

/* -----------------------------------------------------------
   REST API — GET (Part IV requirement: retrieve & display data)
----------------------------------------------------------- */

// Dataset 1: Products
app.get('/api/products', function (req, res) {
  const products = loadProducts();
  res.json(products);
});

app.get('/api/products/:id', function (req, res) {
  const products = loadProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Search products by name/category (GET)
app.get('/api/products-search', function (req, res) {
  const q = req.query.q ? req.query.q.toLowerCase() : '';
  const category = req.query.category ? req.query.category.toLowerCase() : '';
  let products = loadProducts();

  if (q) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  if (category && category !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category);
  }
  res.json(products);
});

// Dataset 2: Customers
app.get('/api/customers', function (req, res) {
  res.json(customers);
});

app.get('/api/customers/:id', function (req, res) {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

// Search customers (used by search-user style page)
app.get('/api/search', function (req, res) {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  if (!query) return res.json([]);

  const results = customers.filter(c =>
    c.firstname.toLowerCase().includes(query) ||
    c.lastname.toLowerCase().includes(query)
  );
  res.json(results);
});

/* -----------------------------------------------------------
   Account creation (registration) — mirrors the sample pattern
----------------------------------------------------------- */
app.post('/register', function (req, res) {
  const nextId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
  const info = {
    id: nextId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: parseInt(req.body.age),
    email: req.body.email
  };
  customers.push(info);
  console.log('New Retro Glam member registered:', info);
  res.redirect('/home');
});

app.post('/edit-profile', function (req, res) {
  console.log('Profile update submitted:', req.body);
  res.redirect('/profile');
});

app.post('/contact', function (req, res) {
  console.log('New contact message:', req.body);
  res.json({ status: 'received', message: 'Thanks for reaching out! We will reply within 1-2 business days.' });
});

app.delete('/delete-customer/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const idx = customers.findIndex(c => c.id === id);
  if (idx !== -1) customers.splice(idx, 1);
  res.json(customers);
});

app.get('/show-customers', function (req, res) {
  res.json(customers);
});

app.listen(3000, function () {
  console.log('Retro Glam server running at http://localhost:3000');
});