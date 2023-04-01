# Frontend Documentation for Fak-Ommerce

## Routes

A continuación, se mostraran las rutas:

**`/categories`**
  
Se listan todas las **`Parent Categories`**.

**`/c/:cat`**

Se listan las **`Parent Categories`** y **`Children Categories`**.

| Param | Description |
| --- | --- |
| `cat` | Slug de la categoria |

Si la categoría es una **`Parent Categories`**, se mostrarán los siguientes datos:

- Portada y Descripción
- Lo más vendido
- Tienda XsTienda Y
Tienda Z Las mejores **`Children Categories`**
- Todas las **`Children Categories`**

Si la categoría es una **`Children Categories`**, se mostrarán los siguientes datos:

- Portada y Descripción
- Lo más vendido
- Tiendas Oficiales
- **`Parent Categories`** con sus **`Children Categories`**, resaltando la actual **`Children Categories`**

**`/c/:cat/products`**
  
Se listan los productos de esa categoría, también contará con un filtro y una forma de ordenamiento.

| Param | Description |
| --- | --- |
| `cat` | Slug de la categoria |

Las `Query Params` que sean de tipo `String`, cada item, debe estar encodeado con [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

| Query Param | Type | Description | Ejemplo
| --- | --- | --- | --- |
| stores | string | Nombre de las Tiendas | Tienda X,Tienda Y,Tienda Z |
| condition | string | Condición del producto (new, used o reconditioned) | new,used,reconditioned |
| price_gt | number | Productos con precio mayor que el especificado | 100 |
| price_lt | number | Productos con precio menor que el especificado | 1000 |
| official | bool | Solamente productos que sean de **`Official Stores`** | true |
| order_by | string | Columna por la que se desea ordenar los productos | price \| sold |
| order_dir | string | Dirección de la ordenación | ASC \| DESC |
