# GenericResource

Flexible resource wrapper for handling:

- Single resources
- Collections
- Paginated data
- Custom resource mappings

## Constructor

```ts
new GenericResource(resource, response?)
```

---

## Key Differences

| Feature            | Resource | GenericResource |
| ------------------ | -------- | --------------- |
| Single resource    | ✓        | ✓               |
| Collection support | Limited  | ✓               |
| Pagination support | No       | ✓               |
| Dynamic mapping    | No       | ✓               |

## Example

```ts
return new GenericResource(users, res)
  .additional({ status: 'success' })
  .response();
```
