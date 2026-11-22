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

export { getFeaturedVehicles };