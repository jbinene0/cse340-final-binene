import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/models/db.js';
import router from './src/controllers/routes.js';
import { addGlobalData } from './src/middleware/global.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form submissions into req.body
app.use(express.urlencoded({ extended: false }));

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

  const view = status === 404 ? 'errors/404' : 'errors/500';
  res.status(status).render(view, {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
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