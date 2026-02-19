# Generating Resources

Resora ships with a CLI command for generating Resource and ResourceCollection classes.

The generator ensures consistent structure and naming conventions across your project.

## Command Overview

The `create` command namespace supports three modes:

- Generate a single Resource
- Generate a ResourceCollection
- Generate both at once

### 1. Create a Resource

Generates a new Resource class.

#### Command

```bash
resora create:resource User
```

#### Arguments

- `name` (required) — Name of the resource class

#### Options

- `--force` — Overwrite the file if it already exists

#### Example

```bash
resora create:resource Post
```

Generates:

```
PostResource.ts
```

### 2. Create a Resource Collection

Generates a new ResourceCollection class.

#### Command

```bash
resora create:collection User
```

#### Arguments

- `name` (required) — Name of the collection class

#### Options

- `--force` — Overwrite the file if it already exists

#### Example

```bash
resora create:collection Post
```

Generates:

```
PostCollection.ts
```

### 3. Create Both Resource and Collection

Generates both a Resource and its corresponding Collection.

#### Command

```bash
resora create:all User
```

#### Arguments

- `prefix` (required) — Base name for both files

#### Options

- `--force` — Overwrite existing files

#### Example

```bash
resora create:all Admin
```

Generates:

```
AdminResource.ts
AdminCollection.ts
```

## Force Overwriting Files

If a file already exists, use `--force` to overwrite it.

Example:

```bash
resora create:resource User --force
```

## Generated Naming Convention

The generator follows strict naming rules:

| Command Mode | Generated Class                      |
| ------------ | ------------------------------------ |
| resource     | `NameResource`                       |
| collection   | `NameCollection`                     |
| all          | `PrefixResource`, `PrefixCollection` |

This keeps your transformation layer predictable and structured.

## Why Use the Generator?

Using the CLI ensures:

- Consistent file naming
- Proper class structure
- Reduced boilerplate
- Clean separation between entity and collection logic

It is the recommended way to scaffold new API transformation layers.
