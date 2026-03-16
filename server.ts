import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'db.json');

// Initial data structure
const initialData = {
  settings: {
    siteName: 'Prompt Haven',
    siteLogo: '',
    primaryColor: '#6366f1', // indigo-500
    secondaryColor: '#0f172a', // slate-900
    fontFamily: 'Inter, sans-serif',
    layout: 'grid',
    description: 'A comprehensive directory for AI prompts, tools, and creations.'
  },
  prompts: [], // Will be populated from src/data/prompts.ts if empty
  pendingPrompts: [],
  admin: {
    email: 'mroy456788@gmail.com',
    password: 'mroy46788@#$%&'
  }
};

// Load or initialize DB
function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    // If DB doesn't exist, try to seed from src/data/prompts.ts
    // For simplicity in this environment, we'll just use the initialData
    // and let the user manage it.
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = getDb();
    if (email === db.admin.email && password === db.admin.password) {
      res.json({ success: true, token: 'fake-jwt-token-for-admin' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  app.get('/api/settings', (req, res) => {
    const db = getDb();
    res.json(db.settings);
  });

  app.post('/api/settings', (req, res) => {
    const db = getDb();
    db.settings = { ...db.settings, ...req.body };
    saveDb(db);
    res.json({ success: true, settings: db.settings });
  });

  app.get('/api/prompts', (req, res) => {
    const db = getDb();
    res.json(db.prompts);
  });

  app.get('/api/admin/prompts', (req, res) => {
    const db = getDb();
    res.json({
      approved: db.prompts,
      pending: db.pendingPrompts
    });
  });

  app.post('/api/prompts/submit', (req, res) => {
    const db = getDb();
    const newPrompt = {
      ...req.body,
      id: Date.now().toString(),
      views: 0,
      isFeatured: false,
      status: 'pending'
    };
    db.pendingPrompts.push(newPrompt);
    saveDb(db);
    res.json({ success: true, message: 'Prompt submitted for approval' });
  });

  app.post('/api/admin/prompts/approve', (req, res) => {
    const { id } = req.body;
    const db = getDb();
    const index = db.pendingPrompts.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      const prompt = db.pendingPrompts.splice(index, 1)[0];
      prompt.status = 'approved';
      db.prompts.push(prompt);
      saveDb(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Prompt not found' });
    }
  });

  app.post('/api/admin/prompts/delete', (req, res) => {
    const { id, type } = req.body; // type: 'approved' | 'pending'
    const db = getDb();
    if (type === 'approved') {
      db.prompts = db.prompts.filter((p: any) => p.id !== id);
    } else {
      db.pendingPrompts = db.pendingPrompts.filter((p: any) => p.id !== id);
    }
    saveDb(db);
    res.json({ success: true });
  });

  app.post('/api/admin/prompts/update', (req, res) => {
    const { id, data } = req.body;
    const db = getDb();
    const index = db.prompts.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      db.prompts[index] = { ...db.prompts[index], ...data };
      saveDb(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  });

  app.post('/api/admin/prompts/add', (req, res) => {
    const db = getDb();
    const newPrompt = {
      ...req.body,
      id: Date.now().toString(),
      views: 0,
      isFeatured: req.body.isFeatured || false,
      status: 'approved'
    };
    db.prompts.push(newPrompt);
    saveDb(db);
    res.json({ success: true, prompt: newPrompt });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
