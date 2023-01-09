# E-Commerce <!-- omit from toc -->

Decidí crear un E-Commerce desde 0 con el fin de aprender y ver que conocimientos me faltan mejorar para seguir avanzando como Backend Developer con Node.js

Este proyecto es un E-Commerce que permite a los usuarios comprar y vender productos de manera segura y fácil.

El sistema cuenta con diferentes `Roles`, como `Owners`, `Sellers`, `Customers` y `Employees`. Cada rol puede tener diferentes `Scopes` y `Permissions` para realizar diferentes acciones dentro del sistema.

## Tabla de contenido <!-- omit from toc -->

- [Installation](#installation)
- [Use](#use)
- [Security](#security)
  - [Roles](#roles)
  - [Scopes](#scopes)
  - [Permissions](#permissions)
- [Modules](#modules)
  - [Modules Administration](#modules-administration)

## Installation

## Use

## Security

### Roles

| Name            | Description                                    |
| --------------- | ---------------------------------------------- |
| Owner           | Usuario dueño del E-Commerce con acceso total  |
| Seller          | Usuario dueño de una Tienda con acceso total   |
| Customer        | Usuario que utiliza el sistema E-Commerce      |
| Employee System | Empleado del E-Commerce                        |
| Employee Store  | Empleado de una Tienda                         |

### Scopes

- `Security System Manager`: Persona encargada de gestionar los Roles, Scopes y Permisos del E-Commerce
- `Security Store Manager`: Persona encargada de gestionar los Roles, Scopes y Permisos de una Tienda
- `Category Manager`: Persona encargada de gestionar las categorías del E-Commerce
- `Brand Verification Manager`: Persona encargada de verificar si una Tienda del E-Commerce es Oficial
- `Product Manager`: Persona encargada de gestionar los productos de una tienda
- `Returns Manager`: Persona encargada de gestionar los pedidos de devolución de productos de una tienda
- `Product Questions Manager`: Persona encargada de gestionar las preguntas y respuestas sobre los productos de una tienda
- `Product Review Manager`: Persona encargada de analizar las reseñas de los productos de una tienda

### Permissions

## Modules

Los módulos son las secciones disponibles para la gestión desde lo más básico del E-Commerce hasta
acciones complejas del mismo. Ya que, dependiendo de qué módulos se modifiquen, podría alterar
muchas partes y hasta dejar al sistema sin funcionar. Por eso, es muy importante sabér qué hace
cada módulo y reaccionar a ellos correctamente.

Aquí una lista de los módulos disponibles:

- `Roles`: Módulo donde es posible gestionar los diferentes roles dentro del E-Commerce.
- `Scopes`: Módulo donde es posible gestionar los diferentes scopes del E-Commerce.
- `Scopes Managment`: Módulo donde es posible gestionar los diferentes scopes que se le dan a los `Employees` ya sean del `E-Commerce` o de una `Tienda`.
- `Permissions`: Módulo donde es posible gestionar los diferentes permisos que puede tener un `Employee` en un `Scope`.
- `Employee-Scope Permissions Managment`: Módulo donde es posible gestionar los diferentes permisos que puede tener un `Employee` en un `Scope`.
- `Categories`: Módulo donde es posible gestionar las diferentes `Categories` de los productos dentro del `E-Commerce`.
- `Products`: Módulo donde es posible gestionar los productos que vende una `Tienda` en el `E-Commerce`.
- `Movement Types`: Módulo donde es posible gestionar los diferentes tipos de transacciones que ocurren en el `E-Commerce`.
- `Charge Category Managment`: Módulo donde es posible gestionar el tipo de `Category` que puede tener un `Charge`.
- `Charges Managment`: Módulo donde es posible gestionar los diferentes tipos de `Charges` para cada `Moviment Type`.
- `Movement Charges Managment`: Módulo donde es posible asociar los diferentes tipos de `Charges` para cada uno de los `Movement Types` dentro del `E-Commerce`.
- `Businesses`: Módulo donde es posible gestionar cada `Tienda` dentro del `E-Commerce`.

### Modules Administration

| Module | Required Role | Required Scope | Visible To |
| ------ | ------------- | -------------- | ---------- |
| `Roles` | `Owner`, `Employee System` | `Security System Manager` | `Owner`, `Employee System` | <!-- Security -->
| `Scopes` | `Owner` | - | `Owner` |
| `Scope Managment` | `Owner`, `Seller` | - | `Owner`, `Seller` |
| `Permissions` | `Owner` | - | `Owner` |
| `Employee-Scope Permissions Managment` | `Owner`, `Seller` | - | `Owner`, `Seller` |
| `Categories` | `Owner` | - | `Owner` | <!-- Categories -->
| `Products` | `Seller`, `Employee Seller` | `Product Manager` | `Seller`, `Employee Seller`| <!-- Products -->
| `Movement Types` | `Owner` | - | `Owner` | <!-- Transactions and Surcharges -->
| `Charge Category Managment` | `Owner` | - | `Owner` |
| `Charges Managment` | `Owner` | - | `Owner` |
| `Movement Charges Managment` | `Owner` | - | `Owner` |
| `Businesses` | `Seller` | - | `Seller` |

<!-- ## Features -->
<!-- ## Credits -->
<!-- ## API documentation -->
<!-- ## Contributing -->
<!-- ## Licencia -->