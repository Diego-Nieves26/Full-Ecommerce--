## Decripcion

Hice un ecommerce donde el usuario pueda loguearse, ver y filtrar productos, añadirlos al carrito y comprarlos. Utilizando una [API](https://documenter.getpostman.com/view/5028918/UVypxw3W#8d80d26a-7c0a-4283-a272-253ae4144624) proporcionada por Academlo para poder hacer las funcionalidades. 

La ruta raíz “/”, se encarga de listar todos los productos. Cada producto es un link que llevará a la ruta “/product/:id”, cuyo id dependerá del producto seleccionado, esto para mostrar mas datos del producto. A la vez esta ruta contiene 3 tipos de filtro, por categoria con una etiqueta select, por nombre con un simple imput y filtrado por precio con un pequeño formulario.

La ruta “/product/:id” mostrará toda la información del producto: nombre, imágenes, descripción y precio. A la vez tiene un contador para que el usuario seleccione cuántos productos desea comprar. Tiene un botón para agregar el producto al carrito, y un listado de productos con la misma categoría del producto seleccionado.

La ruta “/purchases” es una ruta protegida. Aquí el usuario podrá ver los productos que ha comprado.

La ruta pública “/login”, donde el usuario pueda loguearse y registrarse en la aplicación.

Tambien una barra de navegacion que se muestra en toda la app, que sirve para direccionar a las diferentes rutas.


## Funciones y datos del proyecto

- Las rutas (“/” - “/products/:id” - “/login”) son libres y la ruta (“/purchases”) es protegida.
- Practique con redux thunk.
- En la ruta “/” los productos son Links que lleven a la ruta /products/:id.
- En la ruta “/” Los productos se pueden filtrar por nombre, categoría y precio.
- En la ruta “/products/:id” hay un contador para que el usuario pueda elegir la cantidad del producto que quiera agregar al carrito.
- En la ruta “/products/:id” hay un botón para agregar el producto al carrito.
- En la ruta“/products/:id” se listan los productos de la misma categoría del producto mostrado.
- Carrito con un botón para comprar los productos agregados y a la vez mostrarlos.
- Los productos en el carrito cuentan con un boton para ser retirados de dicho campo.
- La ruta pública “/signup” sirve para que el usuario pueda registrarse o iniciar secion.
- La ruta protegida “/user” muestra al usuario sus datos.

## Autor
** Diego Nieves **
* [LinkedIn](https://www.linkedin.com/in/diego-nieves-04b409242/)
* [Portafolio web](https://nvs-dlc.netlify.app)

## Abrir App
- [Ecommerce App](https://joyful-melomakarona-6f3db3.netlify.app/)

## Contratación
Si quieres contratarme puedes escribirme a nieves.diego0426@gmail.com 👍.
