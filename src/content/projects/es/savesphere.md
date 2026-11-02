---
title: "SaveSphere"
description: "App de finanzas personales y control de presupuesto con gestión de cuentas, transacciones categorizadas, asistencia financiera con IA y analíticas para mejorar hábitos de gasto."
image: "/images/projects/savesphere/front.png"
tags: ["SvelteKit", "Go", "Chi", "AI"]
order: 3
url: "/es/projects/savesphere"
repo: "https://github.com/DanielPenalozaB/savesphere"
---

## Resumen

SaveSphere es una aplicación de finanzas personales que muestra con claridad en qué se va el dinero y ayuda a controlarlo. Además del seguimiento de presupuesto tradicional, da consejos generados con IA a partir de las transacciones reales de cada usuario.

## El problema

Las aplicaciones de finanzas que existen o abruman con su complejidad (YNAB, Quicken) o son tan simples que dejan de ser útiles. Además, la mayoría describe en qué gastas sin decirte qué cambiar. Yo quería una aplicación que:

- Te permitiera registrar una transacción en pocos segundos
- Categorizara los gastos automáticamente
- Diera consejos generados con IA que ayuden a cambiar hábitos
- Funcionara con varias cuentas y monedas

## Objetivos

- Construir una aplicación full-stack rápida con SvelteKit y Go
- Dar consejos financieros asistidos por IA a partir del historial de transacciones
- Diseñar un dashboard claro, con analítica que signifique algo
- Soportar varias cuentas, categorías y transacciones recurrentes
- Mantener por debajo de 100ms las respuestas de la API en las operaciones principales

## Stack tecnológico

| Tecnología | Rol |
| ---------- | --- |
| **SvelteKit** | Framework frontend con SSR y rutas basadas en archivos |
| **Go** | Servicio backend para procesamiento de datos de alto rendimiento |
| **Chi** | Router HTTP ligero para la API en Go |
| **PostgreSQL** | Base de datos primaria para transacciones y datos de usuario |
| **OpenAI API** | Insights y recomendaciones financieras con IA |
| **TailwindCSS** | Estilos de UI con design tokens personalizados |

## Arquitectura

El frontend y el backend están completamente separados:

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────┐
│   SvelteKit     │────▶│   Go API (Chi)  │────▶│  PostgreSQL  │
│   Frontend      │◀────│   /api/v1/*     │◀────│              │
└─────────────────┘     └────────┬────────┘     └──────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   OpenAI API    │
                        │   (Insights)    │
                        └─────────────────┘
```

El backend en Go maneja toda la lógica de negocio, la autenticación y el almacenamiento de datos. La capa de IA procesa el historial de transacciones en segundo plano para generar insights periódicos, así nunca vuelve lento el flujo principal de la aplicación.

## Funcionalidades

### Varias cuentas

Los usuarios pueden llevar cuentas corrientes, ahorros, tarjetas de crédito y efectivo, cada uno con su propio saldo e historial de transacciones. Un solo dashboard suma los totales de todas.

### Transacciones categorizadas

Cada transacción recibe una categoría (comida, transporte, entretenimiento, etc.), ya sea a mano o a partir de una sugerencia. Las categorías alimentan tanto la analítica como las recomendaciones de la IA.

### Asesor financiero con IA

Es la funcionalidad principal: un asistente de IA que analiza los patrones de gasto y da consejos personalizados que puedes aplicar. Detecta cosas como:

- Picos de gasto inusuales en una categoría
- Oportunidades de ahorro a partir de patrones recurrentes
- Recomendaciones de presupuesto mensual según los ingresos y las metas

### Dashboard de analítica

Los gráficos desglosan el gasto por categoría, periodo y cuenta:

- Tendencias de gasto mensual (gráficos de líneas)
- Gasto por categoría (gráficos de dona)
- Ingresos comparados con gastos
- Avance de cada presupuesto

### Transacciones recurrentes

Las transacciones programadas, como el arriendo, las suscripciones y el salario, se agregan solas en su fecha, así el registro se mantiene al día sin ingresarlas a mano.

## Problemas que tuve que resolver

### Saldos que se actualizan al instante

Con miles de transacciones en varias cuentas, los saldos tenían que ser instantáneos, y sumar todas las transacciones en cada petición se volvía lento muy rápido. En cambio, cada transacción guarda el saldo que resulta de ella. Los saldos de las cuentas están desnormalizados y se actualizan dentro de la misma transacción de base de datos, lo que mantiene las consultas de saldo en O(1) y los datos consistentes.

### Consejos de IA que sirvan

Las primeras versiones de la funcionalidad de IA daban consejos genéricos como "gasta menos en restaurantes", y los usuarios necesitaban algo específico para ellos. Reescribí los prompts para incluir resúmenes mensuales por categoría, los cambios en el gasto y las metas del propio usuario. Ahora los insights se ven así: "Tu gasto en supermercado aumentó 23% este mes comparado con tu promedio de 3 meses. Considera planificar comidas los domingos — usuarios con perfiles similares ahorran ~$80.000/mes de esta forma."

### Mantener Go y SvelteKit sincronizados

Mantener con tipos seguros la comunicación entre la API en Go y el frontend en SvelteKit requería cuidado, porque las formas de las peticiones y respuestas podían desalinearse. Los contratos de la API se definen una sola vez como especificaciones OpenAPI: de ellas se generan los tipos de TypeScript del frontend y contra ellas se validan los handlers de Go, así un cambio en el contrato se detecta en tiempo de compilación.

## Esquema de base de datos (simplificado)

```sql
CREATE TABLE accounts (
    id          UUID PRIMARY KEY,
    user_id     UUID REFERENCES users(id),
    name        VARCHAR(100) NOT NULL,
    type        VARCHAR(20) NOT NULL,
    balance     DECIMAL(12,2) DEFAULT 0,
    currency    VARCHAR(3) DEFAULT 'COP'
);

CREATE TABLE transactions (
    id          UUID PRIMARY KEY,
    account_id  UUID REFERENCES accounts(id),
    category_id UUID REFERENCES categories(id),
    amount      DECIMAL(12,2) NOT NULL,
    type        VARCHAR(10) NOT NULL, -- 'income' | 'expense'
    description TEXT,
    date        TIMESTAMP NOT NULL,
    balance     DECIMAL(12,2) NOT NULL
);
```

## Rendimiento

| Métrica | Objetivo | Logrado |
| ------- | -------- | ------- |
| Respuesta API (p95) | < 100ms | 47ms |
| Carga del dashboard | < 1.5s | 1.1s |
| Creación de transacción | < 200ms | 89ms |
| Generación de insight IA | < 5s | ~3.2s |

## Lo que aprendí

1. Go funciona bien para APIs financieras. Su sistema de tipos atrapa errores de precisión en tiempo de compilación, y las goroutines manejan los cálculos de saldo concurrentes con limpieza.
2. Las funcionalidades de IA necesitan límites. Sin prompts estructurados y validación de la respuesta, lo que devuelve el LLM es demasiado genérico para ser útil, y el contexto que le das al modelo importa más que el modelo que elijas.
3. La reactividad de SvelteKit encaja con los dashboards. Los stores derivados y las declaraciones reactivas hacen que los gráficos se actualicen al instante sin manejar el estado a mano.
4. Hay que empezar por el modelo de datos. Definir bien desde temprano el esquema de transacciones y cuentas me ahorró migraciones costosas después.

## Próximos pasos

- [ ] Sincronización de cuentas bancarias mediante Plaid
- [ ] Metas de presupuesto con notificaciones de avance
- [ ] Cuentas compartidas para el hogar
- [ ] Una aplicación móvil en Flutter sobre el mismo backend
- [ ] Exportación a CSV y PDF para la temporada de impuestos
