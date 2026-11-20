-- WARNING: Drops and recreates tables. Development only, never run against live data.
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS vehicle_images CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;

-- Roles: lookup table for permission levels
CREATE TABLE roles (
  role_id     SERIAL PRIMARY KEY,
  role_name   VARCHAR(20) UNIQUE NOT NULL,
  description VARCHAR(255)
);

INSERT INTO roles (role_name, description) VALUES
  ('owner',    'Full control over the site and all content'),
  ('employee', 'Manages vehicles, reviews, service requests, and messages'),
  ('user',     'Standard customer account');

-- Users: every account, linked to one role
CREATE TABLE users (
  user_id       SERIAL PRIMARY KEY,
  first_name    VARCHAR(50)  NOT NULL,
  last_name     VARCHAR(50)  NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id       INTEGER NOT NULL REFERENCES roles(role_id) ON DELETE RESTRICT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories: Trucks, Vans, Cars, SUVs
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name        VARCHAR(50) UNIQUE NOT NULL
);

-- Vehicles: dealership inventory
CREATE TABLE vehicles (
  vehicle_id   SERIAL PRIMARY KEY,
  category_id  INTEGER REFERENCES categories(category_id) ON DELETE SET NULL,
  make         VARCHAR(50)   NOT NULL,
  model        VARCHAR(50)   NOT NULL,
  year         SMALLINT      NOT NULL CHECK (year BETWEEN 1900 AND 2100),
  price        NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  mileage      INTEGER       NOT NULL DEFAULT 0 CHECK (mileage >= 0),
  description  TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vehicle images: one vehicle can have many images
CREATE TABLE vehicle_images (
  image_id   SERIAL PRIMARY KEY,
  vehicle_id INTEGER NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  image_url  VARCHAR(255) NOT NULL,
  alt_text   VARCHAR(255),
  is_primary BOOLEAN NOT NULL DEFAULT FALSE
);