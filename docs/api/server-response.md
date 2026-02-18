# ServerResponse

Abstracts HTTP response handling for Connect (Express) and H3.

## Constructor

```ts
new ServerResponse(response, body);
```

## Methods

### setStatusCode(status)

```ts
response.setStatusCode(201);
```

### header(key, value)

```ts
response.header('X-App-Version', '1.0.0');
```

### setHeaders(headers)

```ts
response.setHeaders({
  'Cache-Control': 'no-cache',
});
```

### setCookie(name, value, options)

```ts
response.setCookie('token', 'abc123', {
  HttpOnly: true,
  Path: '/',
});
```

## Promise Support

```ts
await resource.response().setStatusCode(201);
```

The body is automatically sent if the underlying response supports `.send()`.
