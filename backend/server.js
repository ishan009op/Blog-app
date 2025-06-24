const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const SECRET_KEY = 'mysecretkey'; // Use .env for this in real apps

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/blogs')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schemas
const BlogSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  writer: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Models
const Blog = mongoose.model("blog", BlogSchema);
const User = mongoose.model("user", UserSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Blog Routes
app.get("/home", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.post('/home', async (req, res) => {
  const body = req.body;
  const blog = await Blog.create({ id: uuid.v4(), ...body });
  res.json(blog);
});

app.get('/home/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ id });
  res.json(blog);
});

app.delete('/home/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOneAndDelete({ id });
  res.json(blog);
});

app.put('/home/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedBlog = await Blog.findOneAndUpdate({ id }, updatedData, { new: true });
  res.json(updatedBlog);
});

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'Email already registered' });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hash });
  await newUser.save();

  res.json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful', token });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
