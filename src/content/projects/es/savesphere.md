---
title: "SaveSphere"
description: "Una aplicación de finanzas personales en desarrollo activo: un libro contable de doble entrada para gastos, ingresos, metas de ahorro y suscripciones, con insights de IA opcionales en los que cada usuario usa su propia clave."
image: "/images/projects/savesphere/front.png"
tags: ["SvelteKit", "NestJS", "PostgreSQL", "IA"]
order: 4
url: "/es/projects/savesphere"
repo: "https://github.com/DanielPenalozaB/savesphere"
---

## Resumen

SaveSphere es una aplicación de finanzas personales para registrar gastos, ingresos, ahorros y suscripciones, y para planear compras. Se instala como PWA y funciona en español e inglés. La IA es opcional: cada usuario puede conectar su propia clave de Anthropic, OpenAI o Google, y la aplicación funciona igual sin ella.

Está en desarrollo activo. La reinicié desde cero como monorepo el 20 de octubre de 2026, y por ahora el libro contable, las cuentas, las categorías, las metas de ahorro y la gestión de claves de IA funcionan de punta a punta.

## Lo que quería de ella

Quería una herramienta donde registrar un movimiento tome segundos, el dinero nunca se redondee por errores de punto flotante y nada dependa de enviar mis datos a un proveedor de IA. La interfaz sigue un proyecto de diseño de Google Stitch ("Expense and Budget Tracker").

## Stack

| Capa        | Tecnología                                                                     |
| ----------- | ------------------------------------------------------------------------------ |
| Web         | SvelteKit 3, Svelte 5, Tailwind CSS 4, Paraglide (en/es), PWA                  |
| API         | NestJS 12 sobre Express, Better Auth, Zod                                      |
| Base de datos | PostgreSQL 18, Drizzle ORM                                                   |
| IA          | Opcional, con la clave de cada usuario mediante el Vercel AI SDK (Anthropic, OpenAI, Google) |
| Herramientas | pnpm workspaces, Turborepo, TypeScript 6, Node 24                             |
| Pruebas     | Vitest (unitarias, de componentes y de integración con Testcontainers), Playwright |
| Despliegue  | Imágenes Docker en GHCR, desplegadas con Coolify en un VPS                     |

## Arquitectura

SaveSphere es un monolito modular. Una sola API en NestJS tiene toda la lógica de negocio, y la aplicación en SvelteKit solo dibuja la interfaz. El navegador solo habla con el servidor web, que reenvía `/api/*` a la API, así las cookies son de primera parte y no hay que configurar CORS.

```
Navegador (PWA) ──▶ web (SvelteKit) ──/api/*──▶ api (NestJS) ──▶ PostgreSQL 18
                                                 │
                                                 └──▶ proveedor de IA (opcional, clave por usuario)
```

El repositorio está dividido para que las reglas importantes no dependan de ningún framework:

- `apps/web`: la PWA en SvelteKit
- `apps/api`: la API en NestJS, con autenticación, reglas de negocio y control de acceso a la IA
- `packages/core`: las reglas de dinero y del libro contable, sin framework y sin I/O
- `packages/contracts`: esquemas de Zod y códigos de error compartidos entre la web y la API
- `packages/db`: el esquema de Drizzle, las migraciones y los datos iniciales

Todas las respuestas de la API usan el mismo formato (`{ success, data }` o `{ success, error }`), y los códigos de error viven en los contratos compartidos, así la web puede reaccionar a cada uno.

## Modelo de datos

El esquema tiene 32 tablas en tercera forma normal. Unas pocas decisiones lo definen:

- El dinero se guarda como enteros en la unidad mínima de la moneda (`bigint`), nunca como decimales de punto flotante.
- Es un libro contable de doble entrada. Cada transacción tiene uno o más asientos con un monto con signo por cuenta: un gasto o un ingreso tiene un asiento y una transferencia tiene dos. Los saldos siempre se calculan a partir de los asientos y nunca se guardan.
- Las tablas hijas apuntan a su tabla padre con llaves foráneas compuestas `(user_id, id)`, así el propio PostgreSQL rechaza datos que mezclen a dos usuarios aunque el código de la aplicación tenga un error. Las pruebas de integración lo verifican.
- Las llaves primarias son UUIDv7 generados por PostgreSQL 18, ordenados en el tiempo y amables con los índices.
- Cada transacción tiene un `client_ref` único por usuario, así reintentar una escritura hecha sin conexión nunca crea un duplicado.

## IA opcional

Cada usuario decide si usa IA. La API revisa, en orden, si el usuario la desactivó, si tiene una clave propia activa y si la instancia tiene una clave compartida. Si nada de eso aplica, las funciones de IA aparecen bloqueadas, con una explicación y un enlace a la configuración, en lugar de desaparecer.

Las claves se cifran con AES-256-GCM, se prueban con una llamada real antes de guardarlas y nunca vuelven al navegador, salvo sus últimos cuatro caracteres. Funciones como los insights y "¿me alcanza para comprarlo?" están pensadas para funcionar solo con reglas y usar la IA únicamente para explicar el resultado, así los números siempre salen del código. En las pruebas, un proveedor falso da respuestas fijas, así ninguna prueba llama a una API de IA real.

## Pruebas

| Nivel                | Contra qué corre                                                     |
| -------------------- | -------------------------------------------------------------------- |
| Unitarias            | Nada externo; `packages/core` exige 90% de cobertura                 |
| Componentes          | Un navegador Chromium real (modo navegador de Vitest)                |
| Integración de la API | HTTP real hacia NestJS y un contenedor desechable de PostgreSQL 18  |
| De punta a punta     | Las imágenes Docker de producción, una vez con la IA apagada y otra encendida |

## Qué funciona y qué sigue

Ya funciona: registro e inicio de sesión, configuración, cuentas, categorías, transacciones con resúmenes mensuales, metas de ahorro, gestión de claves de IA y convertir una frase en una transacción con IA. En la web hay un panel de inicio, la lista de movimientos, un panel para registrar movimientos, la creación de la primera cuenta y las bóvedas de ahorro.

Lo siguiente:

- [ ] Presupuestos y el planeador de compras
- [ ] Reglas recurrentes y suscripciones
- [ ] Insights y reportes generados por un proceso en segundo plano
- [ ] Notificaciones push y por correo
- [ ] Bots de Telegram y WhatsApp que usen la misma API
