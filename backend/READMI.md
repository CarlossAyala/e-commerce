# Fake-Commerce Backend/API

- [Fake-Commerce Backend/API](#fake-commerce-backendapi)
  - [Categories](#categories)
    - [Delete](#delete)

## Categories

All about Categories

### Delete

Depending on which category `type` we remove, we will cause different effects:

- `main`
  - `Products` under it will be disabled.
  - Categories under it with `sub` type will be disabled and moved to `single` type.
  - `Products` under their `sub` categories will be disabled too.
- `sub` and `single`
  - The `Products` under these will be disabled.
