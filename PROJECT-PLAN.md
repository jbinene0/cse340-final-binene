# Project Plan: Used Car Dealership

## Phase 1: Setup
- Express app with ESM, EJS layouts and partials
- Folder structure (models, views, controllers, routes, middleware)
- Global error handler
- PostgreSQL connection and environment variables

## Phase 2: Database
- Create tables: users, categories, vehicles, vehicle_images, reviews,
  service_requests, service_notes, contact_messages
- Foreign keys with CASCADE / SET NULL
- Seed data for categories, vehicles, and test accounts

## Phase 3: Public Pages
- Home page with featured vehicles
- Browse by category
- Vehicle detail page (/vehicle/:id)
- Contact form saved to the database

## Phase 4: Authentication
- Register and login with bcrypt
- express-session with a PostgreSQL session store
- Role middleware (owner, employee, user)

## Phase 5: User Features
- Create, edit, and delete reviews
- Submit service requests and view their status history

## Phase 6: Dashboards
- Employee: update request status, add notes, moderate reviews,
  view contact messages
- Owner: manage vehicles, categories, and users

## Phase 7: Security and Deployment
- Validation and sanitization on all forms
- Deploy to Render with a production database
- README with ERD, roles, test accounts, and known limitations