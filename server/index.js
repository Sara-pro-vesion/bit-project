import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const uploadDir = path.join(rootDir, 'public', 'uploads');
const dataFile = path.join(dataDir, 'db.json');
const app = express();
const port = process.env.API_PORT || 3001;
const jwtSecret = process.env.JWT_SECRET || 'kindreach-dev-secret';

await fs.mkdir(dataDir, { recursive: true });
await fs.mkdir(uploadDir, { recursive: true });

const initialData = {
  users: [],
  posts: [],
  claims: [],
};

async function readDb() {
  try {
    const content = await fs.readFile(dataFile, 'utf8');
    return { ...initialData, ...JSON.parse(content) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeDb(initialData);
      return structuredClone(initialData);
    }
    throw error;
  }
}

async function writeDb(data) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
}

function createId() {
  return crypto.randomUUID();
}

function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function signToken(user) {
  return jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Please log in first.' });
  }

  try {
    req.auth = jwt.verify(token, jwtSecret);
    next();
  } catch {
    return res.status(401).json({ message: 'Your session expired. Please log in again.' });
  }
}

async function loadCurrentUser(req, res, next) {
  const db = await readDb();
  const user = db.users.find((item) => item._id === req.auth.id);

  if (!user) {
    return res.status(401).json({ message: 'User not found.' });
  }

  req.db = db;
  req.user = user;
  next();
}

function inferCategory(typeOfDonation = '') {
  const text = typeOfDonation.toLowerCase();
  if (text.includes('food') || text.includes('meal')) return 'food';
  if (text.includes('toy')) return 'toys';
  if (text.includes('cloth') || text.includes('shoe') || text.includes('shirt')) return 'clothes';
  if (text.includes('furniture') || text.includes('forniture')) return 'forniture';
  if (text.includes('book')) return 'books';
  if (text.includes('money') || text.includes('cash')) return 'money';
  if (text.includes('car') || text.includes('vehicle') || text.includes('vehicule')) return 'vehicule';
  if (text.includes('phone') || text.includes('computer') || text.includes('elec')) return 'Elecs';
  return 'all';
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, callback) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    callback(null, `${Date.now()}-${createId()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype?.startsWith('image/')) {
      callback(new Error('Only image uploads are allowed.'));
      return;
    }
    callback(null, true);
  },
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

app.get('/api/v1/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/v1/auth/register', async (req, res) => {
  const { name, email, password, role = 'donor', organization } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (!['donor', 'charity'].includes(role)) {
    return res.status(400).json({ message: 'Please choose donor or charity.' });
  }

  const db = await readDb();
  const normalizedEmail = email.toLowerCase().trim();
  const exists = db.users.some((user) => user.email === normalizedEmail);

  if (exists) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = {
    _id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 10),
    role,
    organization: role === 'charity' ? organization || name.trim() : '',
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  await writeDb(db);

  res.status(201).json({
    token: signToken(user),
    user: publicUser(user),
  });
});

app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const db = await readDb();
  const user = db.users.find((item) => item.email === email.toLowerCase().trim());
  const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({
    token: signToken(user),
    user: publicUser(user),
  });
});

app.get('/api/v1/auth/me', authRequired, loadCurrentUser, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.get('/api/v1/posts', authRequired, loadCurrentUser, (req, res) => {
  const posts = req.db.posts
    .filter((post) => Number(post.quantity) > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(posts);
});

app.get('/api/v1/posts/my-posts', authRequired, loadCurrentUser, (req, res) => {
  const posts = req.db.posts
    .filter((post) => post.donorId === req.user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(posts);
});

app.post('/api/v1/posts', authRequired, loadCurrentUser, upload.single('image'), async (req, res) => {
  const { typeOfDonation, quantity, description, contactInfo } = req.body;
  const numericQuantity = Number(quantity);

  if (!typeOfDonation || !numericQuantity || numericQuantity < 1) {
    return res.status(400).json({ message: 'Donation type and a positive quantity are required.' });
  }

  const post = {
    _id: createId(),
    donorId: req.user._id,
    donorName: req.user.name,
    typeOfDonation,
    type: typeOfDonation,
    category: inferCategory(typeOfDonation),
    quantity: numericQuantity,
    description: description || '',
    contactInfo: contactInfo || '',
    image: req.file ? `/uploads/${req.file.filename}` : '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  req.db.posts.push(post);
  await writeDb(req.db);

  res.status(201).json(post);
});

app.put('/api/v1/posts/:id', authRequired, loadCurrentUser, upload.single('image'), async (req, res) => {
  const post = req.db.posts.find((item) => item._id === req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Donation post not found.' });
  }

  if (post.donorId !== req.user._id) {
    return res.status(403).json({ message: 'You can only edit your own posts.' });
  }

  const { typeOfDonation, quantity, description, contactInfo } = req.body;

  if (typeOfDonation) {
    post.typeOfDonation = typeOfDonation;
    post.type = typeOfDonation;
    post.category = inferCategory(typeOfDonation);
  }

  if (quantity !== undefined) {
    const numericQuantity = Number(quantity);
    if (!Number.isFinite(numericQuantity) || numericQuantity < 0) {
      return res.status(400).json({ message: 'Quantity must be a valid number.' });
    }
    post.quantity = numericQuantity;
  }

  post.description = description ?? post.description;
  post.contactInfo = contactInfo ?? post.contactInfo;
  post.image = req.file ? `/uploads/${req.file.filename}` : post.image;
  post.updatedAt = new Date().toISOString();

  await writeDb(req.db);
  res.json(post);
});

app.post('/api/v1/claims', authRequired, loadCurrentUser, async (req, res) => {
  const { postId, quantity, note } = req.body;
  const numericQuantity = Number(quantity);

  if (req.user.role !== 'charity') {
    return res.status(403).json({ message: 'Only charity accounts can claim donations.' });
  }

  if (!postId || !numericQuantity || numericQuantity < 1) {
    return res.status(400).json({ message: 'Please choose a donation and quantity to claim.' });
  }

  const post = req.db.posts.find((item) => item._id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Donation post not found.' });
  }

  if (numericQuantity > Number(post.quantity)) {
    return res.status(400).json({ message: 'Requested quantity is higher than the available stock.' });
  }

  const claim = {
    _id: createId(),
    postId,
    donorId: post.donorId,
    charityId: req.user._id,
    donationType: post.typeOfDonation,
    type: post.typeOfDonation,
    requester: req.user.organization || req.user.name,
    quantity: numericQuantity,
    note: note || '',
    status: 'pending',
    requestedAt: new Date().toLocaleDateString(),
    createdAt: new Date().toISOString(),
  };

  req.db.claims.push(claim);
  await writeDb(req.db);

  res.status(201).json(claim);
});

app.get('/api/v1/claims/incoming', authRequired, loadCurrentUser, (req, res) => {
  const claims = req.db.claims
    .filter((claim) => claim.donorId === req.user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(claims);
});

app.get('/api/v1/claims/my-claims', authRequired, loadCurrentUser, (req, res) => {
  const claims = req.db.claims
    .filter((claim) => claim.charityId === req.user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(claims);
});

app.patch('/api/v1/claims/:id/status', authRequired, loadCurrentUser, async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be approved or rejected.' });
  }

  const claim = req.db.claims.find((item) => item._id === req.params.id);

  if (!claim) {
    return res.status(404).json({ message: 'Claim not found.' });
  }

  if (claim.donorId !== req.user._id) {
    return res.status(403).json({ message: 'You can only manage claims for your donations.' });
  }

  if (claim.status !== 'pending') {
    return res.status(400).json({ message: 'This claim has already been reviewed.' });
  }

  if (status === 'approved') {
    const post = req.db.posts.find((item) => item._id === claim.postId);
    if (!post || Number(post.quantity) < Number(claim.quantity)) {
      return res.status(400).json({ message: 'Not enough stock left to approve this claim.' });
    }
    post.quantity = Number(post.quantity) - Number(claim.quantity);
    post.updatedAt = new Date().toISOString();
  }

  claim.status = status;
  claim.reviewedAt = new Date().toISOString();
  await writeDb(req.db);

  res.json(claim);
});

app.use((error, _req, res, _next) => {
  res.status(400).json({ message: error.message || 'Request failed.' });
});

app.listen(port, () => {
  console.log(`KindReach API running on http://localhost:${port}`);
});