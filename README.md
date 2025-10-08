# Expense GQL

Spend wisely, track wisely.

<img width="1252" height="671" alt="Bildschirmfoto 2025-10-08 um 17 01 05" src="https://github.com/user-attachments/assets/70369a67-4948-48b4-8d78-e032da470e55" />

## Features

- Authentication: sign up, login, logout (cookie-based sessions)
- Transactions: create, list, update, delete
- Category statistics (server) + Doughnut chart (client)
- GraphQL relations: `User.transactions` and `Transaction.user`
- Protected routes, loading states, and toasts
- Responsive UI with Tailwind

## Tech Stack

- Backend: Node.js, Express, Apollo Server, GraphQL, Mongoose, MongoDB Atlas, `express-session` + `connect-mongodb-session`, Passport + `graphql-passport`
- Frontend: Vite + React 19, Apollo Client (`@apollo/client/react`), React Router, Tailwind CSS, react-hot-toast, Chart.js + react-chartjs-2

## Project Structure

```
backend/
frontend/
package.json
```

## Environment Variables

Create a `.env` at the repo root:

```
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_strong_random_secret
# Dev frontend origin; set to your deployed URL in production
CLIENT_ORIGIN=http://localhost:5173
```

Notes:
- Use a long, random `SESSION_SECRET` in production.
- If your frontend runs on a different domain in production, ensure cookies are configured accordingly (secure/sameSite) and CORS `origin` uses your public frontend URL.

## Run Locally

Prereqs: Node 20+, a MongoDB connection string.

- Install deps and build frontend once (optional for dev):
  - `npm install`
  - `npm install --prefix frontend`

- Start backend (dev):
  - `npm run dev` (GraphQL at `http://localhost:4000/graphql`)

- Start frontend (dev):
  - `cd frontend && npm run dev` (Vite at `http://localhost:5173`)

- Production (serve built frontend from backend):
  - `npm run build` (builds frontend)
  - `npm start`

## GraphQL

Endpoint: `POST /graphql`

Common types:
- `Transaction { _id, userId, description, paymentType, category, amount, location, date, user }`
- `User { _id, username, name, profilePicture, gender, transactions }`

Common operations:
- Queries: `transactions`, `transaction(transactionId)`, `categoryStatistics`, `authUser`, `user(userId)`
- Mutations: `createTransaction`, `updateTransaction`, `deleteTransaction`, `signUp`, `login`, `logout`

Client notes:
- Use Apollo Client v4 React entrypoints: `import { ApolloProvider, useQuery, useMutation } from '@apollo/client/react'`
- Include credentials: `HttpLink({ uri, credentials: 'include' })`

## Deploy (Render)

- Web Service (root directory):
  - Build Command: `npm run build`
  - Start Command: `npm start`
- Environment variables: set `MONGO_URI`, `SESSION_SECRET`, and `CLIENT_ORIGIN` to your public frontend URL.
- Express 5 SPA fallback: use a regex catch‑all (already implemented) to serve `frontend/dist/index.html`.

## Project URL

[Live Demo](https://expense-tracker-gql-1.onrender.com)

## License

MIT
