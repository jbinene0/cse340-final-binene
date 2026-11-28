import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/models/db.js';
import router from './src/controllers/routes.js';
import { addGlobalData } from './src/middleware/global.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from './src/models/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set');
}

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form submissions into req.body
app.use(express.urlencoded({ extended: false }));

// Render runs behind a proxy; needed for secure cookies in production
app.set('trust proxy', 1);

// Sessions stored in PostgreSQL
const PgStore = connectPgSimple(session);
app.use(session({
  store: new PgStore({ pool, tableName: 'session', createTableIfMissing: true }),
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: !isDev,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
}));

// Routes
app.use(addGlobalData);
app.use(router);

// 404: no route matched
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Global error handler (must be last)
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  if (status >= 500) console.error(err.stack);

  const pages = {
    403: { view: 'errors/403', title: 'Access Denied' },
    404: { view: 'errors/404', title: 'Page Not Found' }
  };
  const page = pages[status] || { view: 'errors/500', title: 'Server Error' };

  res.status(status).render(page.view, {
    title: page.title,
    stack: isDev ? err.stack : null
  });
});

app.listen(PORT, async () => {
  try {
    await db.query('SELECT NOW()');
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});