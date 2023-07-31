# US cities

Monorepository for backend and frontend application to display and search over US cities

## Requirements

Install pnpm package manager [https://pnpm.io/installation](https://pnpm.io/installation)

## Install dependecies

```bash
pnpm i
```

## Start docker compose

```bash
pnpm --filter ./apps/backend dc:up
```

## Start backend

```bash
pnpm --filter ./apps/backend dev
```

## Start frontend

```bash
pnpm --filter ./apps/frontend dev
```

## Backend stack

I do use my own service loader and context hooks. I use this stack on a daily basis. It provides me fast development cycle, performance, and scalable applications. It's ready to start as a monolith but is also capable to move instantly into micoservice architecure.

- Apollo server (GraphQL)
- Pothos
- Prisma
- PostgreSQL
- Typescript

## Frontend stack

I do use well-tested modern production ready frameworks that I have the most experience with.

- Next.js
- Chakra UI
- URQL
- chakra-react-select
- Typescript
