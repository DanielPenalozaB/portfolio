---
title: "YS Chic"
description: "Una tienda headless de skincare botánico y maquillaje clean: un storefront en Nuxt 4 sobre una API en Strapi 5, con variantes de producto, un motor de promociones, precios recalculados en el servidor y pruebas de punta a punta que incluyen accesibilidad."
image: "/images/projects/ecommerce/front.png"
tags: ["Nuxt", "Strapi", "TypeScript", "Playwright"]
order: 5
url: "/es/projects/ecommerce"
repo: "https://github.com/DanielPenalozaB/ecommerce"
---

## Resumen

YS Chic es una tienda en línea de skincare botánico y maquillaje clean, construida como monorepo con un storefront en Nuxt 4 y una API headless en Strapi 5. La interfaz implementa un diseño de Google Stitch ("Tienda Skincare y Maquillaje"), y la tienda trabaja en pesos colombianos.

El catálogo, el carrito, las promociones y el checkout funcionan contra la API, con datos de demostración que se cargan en el primer arranque. La pasarela de pagos todavía no está integrada, así que el checkout crea las órdenes como pendientes.

## La tienda

- Una página de inicio construida con el editor de páginas de Strapi, con encabezado, mega menú y pie de página que también se gestionan en Strapi
- Un catálogo por categoría con los filtros guardados en la URL, además de búsqueda y novedades
- Fichas de producto con variantes de tamaño, tono y aroma, y datos estructurados de `Product` para los buscadores
- Una colección de maquillaje con un buscador de tonos
- Un cuestionario de piel paso a paso que termina con tus objetivos y recomienda una rutina
- Checkout, confirmación de la orden, lista de favoritos y página de cuenta

Todas las páginas del catálogo se renderizan en el servidor para el SEO. El carrito y los favoritos viven en stores de Pinia guardados en `localStorage`, y los formularios usan vee-validate con las mismas reglas de Zod que la API.

## La API de comercio

El modelo de contenido de Strapi incluye productos (simples, con variantes o en paquete, con ingredientes, resultados clínicos y preguntas frecuentes), variantes con SKU, inventario y umbral de stock bajo, categorías, marcas, colecciones, preocupaciones de la piel, ingredientes, reseñas moderadas, métodos de envío, muestras y suscripciones al boletín. Los menús, las páginas y la configuración global, como el IVA y el monto para el envío gratis, también son contenido, así que se pueden cambiar sin desplegar.

Unas cuantas reglas mantienen la tienda confiable:

- Los precios siempre se recalculan en el servidor. `POST /api/orders/quote` cotiza un carrito (inventario, promociones, regalos, envío, muestras e IVA), y el checkout vuelve a calcular todo antes de crear la orden.
- Cada producto tiene al menos una variante, y un middleware de Strapi mantiene el precio del producto igual al de su variante activa más barata, para que el orden y los filtros por precio sigan siendo correctos.
- El inventario se valida al cotizar y se descuenta al crear la orden.
- El rol público no puede leer órdenes, promociones, códigos promocionales ni suscriptores. Las reseñas entran como borradores para moderarlas, y todos los endpoints públicos validan sus datos con Zod.

### El motor de promociones

Las promociones pueden ser un porcentaje, un monto fijo, envío gratis, lleve X y obtenga Y, o un regalo. Pueden aplicar a toda la orden o a productos, categorías, colecciones o marcas específicas, con subtotales o cantidades mínimas, fechas de vigencia y límites globales o por cliente. Primero se aplican las promociones automáticas según su prioridad y luego el código del cliente. Un código que no se puede combinar se rechaza con un mensaje en lugar de reemplazar en silencio un descuento automático mejor. Los descuentos se reparten entre las líneas de la orden, así cada línea sabe cuánto cuesta en realidad.

## Stack

| Capa        | Tecnología                                                                  |
| ----------- | --------------------------------------------------------------------------- |
| Tienda      | Nuxt 4, TypeScript, Tailwind CSS v4, shadcn-vue, Pinia, vee-validate, Zod   |
| API         | Strapi 5 en TypeScript, validación con Zod                                  |
| Base de datos | PostgreSQL en el stack de Docker; bases SQLite desechables en las pruebas |
| Despliegue  | Docker Compose con Postgres, Strapi, Nuxt y Caddy                           |
| Calidad     | ESLint de Airbnb, commitlint, lint-staged, CI en GitHub Actions             |

## Pruebas

| Capa                 | Qué cubre                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| Unitarias de la API  | El motor de promociones, los esquemas de validación y los datos iniciales |
| Integración de la API | Permisos, catálogo, cotización y checkout, promociones, inventario y moderación, contra un Strapi real con una base de datos desechable |
| Tienda               | La lógica de variantes, los filtros, el carrito, los formularios y las tarjetas de producto |
| De punta a punta     | Recorridos de compra, diseño móvil y revisiones de accesibilidad WCAG 2.1 AA con axe, en Playwright |

## Próximos pasos

- [ ] Una pasarela de pagos colombiana (Wompi, Mercado Pago o PayU) con un webhook firmado que marque las órdenes como pagadas
- [ ] Cuentas de cliente con historial de órdenes y direcciones guardadas
- [ ] Almacenamiento de imágenes en S3 o Cloudinary
- [ ] Búsqueda con Meilisearch o Algolia cuando el catálogo crezca
- [ ] Páginas del catálogo en caché que se actualicen al publicar contenido
