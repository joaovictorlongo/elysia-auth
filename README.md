# Elysia Auth with Bun runtime

## Docker

Create a .env file in the root folder of the project and define the PostgreSQL database URL as follows:

`DATABASE_URL=postgres://postgres:postgres@localhost:5432/elysiaauth
`

Using Docker to set up PostgreSQL with `docker-compose.yml`

Run the following command in the terminal from the project folder:

`sudo docker compose up -d`

## Install dependencies

`bun install`

## Drizzle ORM

The project uses Drizzle, so it is necessary to run the following command to migrate the database:

`npx drizzle-kit push`

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Routes
- POST `/api/auth/sign-up` (Create account)
- POST `/api/auth/sign-in` (Sign in to valid account)
- GET `/api/auth/me` (Returns current user)
- POST `/api/auth/logout` (Logout current user)
- POST `/api/auth/refresh` (Create new access from existing refresh token)
