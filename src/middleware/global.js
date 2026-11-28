import { getAllCategories } from '../models/vehicles/categories.js';

// Makes the category list available to every view (used by the nav)
const addGlobalData = async (req, res, next) => {
  res.locals.categories = await getAllCategories();
  res.locals.user = req.session.user || null;
  next();
};

export { addGlobalData };