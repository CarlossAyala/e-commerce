# Backend for Fak-Ommerce

## Productos

|Nombre | Tipo | Descripción |
| --- | --- | --- |
| q | string | Búsqueda por palabra clave en name y description del producto |
| category | string | ID de la categoría del producto |
| condition | string | Condición del producto (new, used o reconditioned) |
| price_gt | number | Productos con precio mayor que el especificado |
| price_lt | number | Productos con precio menor que el especificado |
| available | bool | Productos disponibles o no disponibles (true o false) |
| order_by | string | Columna por la que se desea ordenar los productos |
| order_dir | string | Dirección de la ordenación (asc o desc) |

## Empresas

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| stores | array > string | Búsqueda por el nombre de la empresa |
| official | bool | Empresas oficiales o no oficiales (true o false) |
| order_by | string | Columna por la que se desea ordenar las empresas |
| order_dir | string | Dirección de la ordenación (asc o desc) |
