-- Categories
INSERT INTO categories (name) VALUES
  ('Trucks'), ('Vans'), ('Cars'), ('SUVs');

-- Test accounts (password for all: see README instructions, never stored in plain text)
INSERT INTO users (first_name, last_name, email, password_hash, role_id) VALUES
  ('Olivia', 'Owner',    'owner@example.com',    '$2b$10$Gdmh7ZIH9EQhzQbxtd7IJOSqyR6agKgAcLjeA63ZA5v75CpXUWqjy', (SELECT role_id FROM roles WHERE role_name = 'owner')),
  ('Evan',   'Employee', 'employee@example.com', '$2b$10$QRdbEHruc5kRiqNL8BkcueKk5Tq4PW00bj0rvhpINe8UJWYJ.vlM.', (SELECT role_id FROM roles WHERE role_name = 'employee')),
  ('Uma',    'User',     'user@example.com',     '$2b$10$cSbx9b2C3mo0KCsQCbd37Oj3BOt8pUZWtTsGONT5pmHIdQEzeSQni', (SELECT role_id FROM roles WHERE role_name = 'user'));

-- Vehicles
INSERT INTO vehicles (make, model, year, price, mileage, description, is_featured, category_id) VALUES
  ('Ford',      'F-150',          2019, 28995.00, 54000, 'Crew cab, 4x4, tow package.',          TRUE,  (SELECT category_id FROM categories WHERE name = 'Trucks')),
  ('Chevrolet', 'Silverado 1500', 2017, 24500.00, 78000, 'Double cab, bed liner, new tires.',    FALSE, (SELECT category_id FROM categories WHERE name = 'Trucks')),
  ('Ford',      'Transit 250',    2020, 31500.00, 41000, 'High roof cargo van, shelving ready.', TRUE,  (SELECT category_id FROM categories WHERE name = 'Vans')),
  ('Honda',     'Odyssey',        2018, 21900.00, 62000, 'Seats 8, rear entertainment system.',  FALSE, (SELECT category_id FROM categories WHERE name = 'Vans')),
  ('Toyota',    'Camry',          2020, 22495.00, 38000, 'One owner, excellent fuel economy.',   TRUE,  (SELECT category_id FROM categories WHERE name = 'Cars')),
  ('Honda',     'Civic',          2016, 13995.00, 89000, 'Reliable commuter, clean history.',    FALSE, (SELECT category_id FROM categories WHERE name = 'Cars')),
  ('Toyota',    'RAV4',           2019, 24995.00, 47000, 'AWD, backup camera, roof rails.',      TRUE,  (SELECT category_id FROM categories WHERE name = 'SUVs')),
  ('Jeep',      'Grand Cherokee', 2018, 23750.00, 66000, '4x4, leather interior, sunroof.',      FALSE, (SELECT category_id FROM categories WHERE name = 'SUVs'));