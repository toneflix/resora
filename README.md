# Resora

Resora is a structured API response layer for Node.js and TypeScript backends.

It provides a clean, explicit way to transform data into consistent JSON responses and automatically send them to the client. Resora supports single resources, collections, and pagination metadata while remaining framework-agnostic and strongly typed.

Resora is designed for teams that care about long-term maintainability, predictable API contracts, and clean separation of concerns.

---

## What Problem Does Resora Solve?

In most Node.js backends:

- Controllers shape JSON directly
- Response formats drift over time
- Pagination logic is duplicated
- Metadata handling is inconsistent

Resora introduces a dedicated **response transformation layer** that removes these concerns from controllers and centralizes response structure in one place.

---

## Core Capabilities

- Explicit data-to-response transformation
- Automatic JSON response dispatch
- First-class collection support
- Built-in pagination metadata handling
- Predictable and consistent response contracts
- Strong TypeScript typing
- Transport-layer friendly (Express, H3, and others)

---

## Usage Example

### Single Resource

```ts
return new UserResource(user).additional({
  status: 'success',
  message: 'User retrieved',
});
```

Response:

```json
{
  "data": {
    "id": 1,
    "name": "John"
  },
  "status": "success",
  "message": "User retrieved"
}
```

---

### Collection with Pagination

```ts
return new UserCollection({
  data: users,
  pagination: {
    from: 1,
    to: 10,
    perPage: 10,
    total: 100,
  },
}).additional({
  status: 'success',
  message: 'Users retrieved',
});
```

Response:

```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "from": 1,
      "to": 10,
      "perPage": 10,
      "total": 100
    }
  },
  "status": "success",
  "message": "Users retrieved"
}
```

---

## Architectural Positioning

Resora sits **between your application logic and the HTTP layer**.

- Controllers handle request flow
- Services handle business logic
- Resora handles response structure

This separation ensures:

- Stable API contracts
- Minimal controller logic
- Clear ownership of response shape

---

## Design Principles

- Explicit over implicit behavior
- Separation of concerns
- Minimal abstraction cost
- Strong typing as a first-class feature
- Framework independence

---

## Framework Compatibility

Resora is not tied to a specific HTTP framework.

It works with:

- Express
- H3
- Any framework exposing request and response objects

Adapters can be added without changing application logic.

---

## When to Use Resora

Resora is a good fit if you:

- Build APIs with long-term maintenance in mind
- Care about response consistency across teams
- Want pagination and metadata handled once
- Prefer explicit structure over ad-hoc JSON responses

It is intentionally not opinionated about routing, validation, or persistence.

---

## License

MIT
