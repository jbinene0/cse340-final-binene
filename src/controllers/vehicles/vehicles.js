import { getVehicleById, getVehicleImages } from '../../models/vehicles/vehicles.js';
import { getCategoryByName } from '../../models/vehicles/categories.js';

const vehicleDetailPage = async (req, res, next) => {
  const vehicleId = Number(req.params.id);

  // Reject anything that isn't a positive whole number (e.g., /vehicle/abc)
  if (!Number.isInteger(vehicleId) || vehicleId < 1) return next();

  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) return next();

  const images = await getVehicleImages(vehicleId);

  res.render('vehicles/detail', {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    vehicle,
    images
  });
};

const categoryPage = async (req, res, next) => {
  const category = await getCategoryByName(req.params.category);
  if (!category) return next();

  const vehicles = await getVehiclesByCategory(category.category_id);
  res.render('vehicles/list', { title: category.name, category, vehicles });
};

export { vehicleDetailPage, categoryPage };