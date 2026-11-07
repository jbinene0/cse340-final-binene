# Final Project Proposal: Used Car Dealership (Option B)

## Project Concept
A server-side rendered used car dealership site built with Node.js, Express, EJS,
and PostgreSQL, deployed on Render. Visitors can browse vehicles by category and
view detail pages. Logged-in users can leave reviews and submit service requests.
Employees manage service requests, moderate reviews, and read contact messages.
The owner has full control over inventory, categories, and user accounts.

## Is the Scope Achievable?
Yes. The requirements are clearly defined, so I can focus on building instead of
designing features from scratch. I plan to build in stages: app skeleton and
database first, then public pages, authentication, reviews, service requests,
dashboards, and deployment last, with commits at each stage.

## Skills Alignment
- Built Node.js/Express projects in CSE 340 and REST APIs in CSE 341
- Web development minor (HTML, CSS, front-end layout)
- Cybersecurity major, so I understand password hashing, session security,
  SQL injection prevention, and input validation
- Experience working with relational data and SQL

## Requirements Coverage
- Roles: Owner, Employee, User with role-based middleware
- Multi-stage workflow: service requests (Submitted → In Progress → Completed)
  with a notes/history table
- User content: reviews users can create, edit, and delete
- Admin content: vehicles, categories, and images managed by the owner
- Security: bcrypt, express-session, parameterized queries, validation

## Anticipated Challenges
- Getting role-based authorization right on every protected route
- Storing sessions in PostgreSQL in production instead of the default memory store
- Handling vehicle images on Render, where uploaded files don't persist
  (I plan to use image URLs or static seeded images)
- Tracking service request history cleanly, not just the current status
- Managing time so deployment and the README aren't rushed at the end