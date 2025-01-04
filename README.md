# Elysia Auth with Bun runtime

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
