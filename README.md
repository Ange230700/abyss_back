<!-- README.md -->

# Abyss Furniture API

<!-- ![Project Logo](link-to-logo.png) -->

**Abyss Furniture API** is a robust backend application that powers a modern e-commerce platform for managing users, furniture, materials, and more. Designed with scalability and developer experience in mind, it offers a full RESTful API, soft deletion support, full test coverage, and Swagger/OpenAPI documentation out of the box.

Key features include:

- CRUD operations on users, furniture, types, materials, images, and relationships
- Soft delete (logical deletion) for all major entities
- Rich data relationships: many-to-many (favorites, furniture-materials), one-to-many (images, furniture-type)
- Auto-generated API docs with Swagger
- Faker-based seed/testing for realistic dev data
- Modular, testable NestJS architecture with Prisma ORM and MySQL

---

## Table of Contents

<!-- * [Demo](#demo) -->

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
<!-- * [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact) -->

<!-- ---

## Demo

Link to a live demo or screenshots:

![Screenshot](link-to-screenshot.png) -->

---

## Tech Stack

**Backend:**

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/) (REST API Framework)
- [Prisma](https://www.prisma.io/) (ORM)
- [MySQL](https://www.mysql.com/) (or other supported databases)

**Testing:**

- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [@faker-js/faker](https://fakerjs.dev/) (for realistic test data)

**Docs & Tooling:**

- [Swagger](https://swagger.io/tools/swagger-ui/) (API docs)
<!-- * [Docker](https://www.docker.com/) (optional)
- [GitHub Actions](https://github.com/features/actions) (CI/CD) -->

---

## Getting Started

### Prerequisites

- Node.js (>=20.x)
- MySQL
<!-- * Docker (optional, for local DB/testing) -->

### Installation

```bash
git clone https://github.com/Ange230700/abyss_back.git
cd repository
npm install
```

---

## Running the Project

**Start backend:**

```bash
npm run start:dev
```

<!-- **Or with Docker:**

```bash
docker-compose up --build
``` -->

> The API will be available on `http://localhost:3000`

---

## Project Structure

```
├── src
│   ├── app.module.ts
│   ├── main.ts
│   ├── user/
│   ├── furniture/
│   ├── furnituretype/
│   ├── material/
│   ├── favorite/
│   ├── image/
│   ├── furniturematerial/
│   └── prisma/
├── tests/
│   └── e2e (end-to-end tests)
├── prisma/
│   └── schema.prisma
├── docs/
│   └── database/
│       └── relationships.md
└── package.json
```

---

## API Documentation

Interactive Swagger docs are available after launch:

- Visit: [http://localhost:3000/docs](http://localhost:3000/docs)

**Entities:**

- User, Furniture, FurnitureType, Material, Favorite, Image, FurnitureMaterial

**Key Endpoints:**

- `POST /users`, `GET /users/:id`, ...
- `POST /furnitures`, `GET /furnitures/:id`, ...
- `POST /materials`, etc.

> For detailed endpoint information, see the Swagger UI or `/docs/database/relationships.md`.

---

## Testing

Run all unit tests:

```bash
npm test
```

Run only end-to-end tests:

```bash
npm run test:e2e
```

- All test data uses realistic values via [@faker-js/faker](https://fakerjs.dev/).
- End-to-end coverage for all CRUD operations and relationships.

---

## Deployment

- Use the `build`, `start:prod`, or Docker scripts in `package.json`.
- Configure your `.env` for production DB, CORS, and secret keys.
- \[Optional] Use GitHub Actions for CI/CD (ready-to-use).

---

## Environment Variables

Create a `.env` file at the project root with:

```env
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
FRONT_API_BASE_URL="http://localhost:3001"
PORT=3000
SOFT_DELETE_MODE=true
DISABLE_SOFT_DELETE=false
```

- See `.env.sample` for more options.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

<!-- ---

## License

MIT License -->

<!-- ---

## Acknowledgements

Special thanks to:

* [NestJS](https://nestjs.com/)
* [Prisma](https://www.prisma.io/)
* [@faker-js/faker](https://fakerjs.dev/)
* [Swagger](https://swagger.io/)
* All open source contributors -->

<!-- ---

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

[Project Link](https://github.com/username/repository) -->
