-- WARNING: Drops and recreates tables. Development only, never run against live data.
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

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