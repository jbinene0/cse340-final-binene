import db from '../db.js';

/**
 * Get featured, available vehicles for the home page,
 * with their category name and primary image (if any).
 */
const getFeaturedVehicles = async () => {
  const sql = `
    SELECT v.vehicle_id, v.make, v.model, v.year, v.price, v.mileage,
           c.name AS category,
           vi.image_url, vi.alt_text
    FROM vehicles v
    LEFT JOIN categories c ON v.category_id = c.category_id
    LEFT JOIN vehicle_images vi ON vi.vehicle_id = v.vehicle_id AND vi.is_primary = TRUE
    WHERE v.is_featured = TRUE AND v.is_available = TRUE
    ORDER BY v.created_at DESC
    LIMIT 6
  `;
  const result = await db.query(sql);
  return result.rows;
};

/**
 * Get one vehicle by ID, with its category name.
 * Returns undefined if no vehicle has that ID.
 */
const getVehicleById = async (vehicleId) => {
  const sql = `
    SELECT v.*, c.name AS category
    FROM vehicles v
    LEFT JOIN categories c ON v.category_id = c.category_id
    WHERE v.vehicle_id = $1
  `;
  const result = await db.query(sql, [vehicleId]);
  return result.rows[0];
};

/**
 * Get all images for a vehicle, primary image first.
 */
const getVehicleImages = async (vehicleId) => {
  const sql = `
    SELECT image_url, alt_text, is_primary
    FROM vehicle_images
    WHERE vehicle_id = $1
    ORDER BY is_primary DESC, image_id
  `;
  const result = await db.query(sql, [vehicleId]);
  return result.rows;
};

const getVehiclesByCategory = async (categoryId) => {
  const sql = `
    SELECT v.vehicle_id, v.make, v.model, v.year, v.price, v.mileage,
           c.name AS category,
           vi.image_url, vi.alt_text
    FROM vehicles v
    JOIN categories c ON v.category_id = c.category_id
    LEFT JOIN vehicle_images vi ON vi.vehicle_id = v.vehicle_id AND vi.is_primary = TRUE
    WHERE v.category_id = $1 AND v.is_available = TRUE
    ORDER BY v.year DESC
  `;
  const result = await db.query(sql, [categoryId]);
  return result.rows;
};

export { getFeaturedVehicles, getVehicleById, getVehicleImages };