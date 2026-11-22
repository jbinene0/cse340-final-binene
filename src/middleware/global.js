import { getAllCategories } from '../models/vehicles/categories.js';

// Makes the category list available to every view (used by the nav)
const addGlobalData = async (req, res, next) => {
  res.locals.categories = await getAllCategories();
  next();
};

export { addGlobalData };