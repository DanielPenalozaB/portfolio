---
title: "SaveSphere"
description: "App de finanzas personales y control de presupuesto con gestión de cuentas, transacciones categorizadas, asistencia financiera con IA y analíticas para mejorar hábitos de gasto."
image: "/images/projects/savesphere/front.png"
tags: ["SvelteKit", "Go", "Chi", "AI"]
url: "/es/projects/savesphere"
repo: "https://github.com/DanielPenalozaB/savesphere"
---

## Resumen

SaveSphere es una aplicación de finanzas personales diseñada para dar a los usuarios visibilidad y control completo sobre sus hábitos de gasto. Combina el seguimiento tradicional de presupuesto con **insights impulsados por IA** que proporcionan consejos financieros accionables basados en patrones reales de transacciones.

> La mejor app de presupuesto es la que realmente usas. SaveSphere fue construida para hacer la conciencia financiera algo sin esfuerzo, no tedioso.

---

## El Problema

Las apps de finanzas existentes o abruman a los usuarios con complejidad (YNAB, Quicken) o simplifican tanto que son inútiles. Lo más crítico: _describen_ tu gasto pero raramente _prescriben_ qué cambiar. Quería una app que:

- Fuera rápida e intuitiva para registrar transacciones en segundos
- Categorizara gastos automáticamente
- Proporcionara insights generados por IA que realmente ayuden a mejorar hábitos
- Funcionara con múltiples cuentas y monedas

---

## Objetivos

- Construir una aplicación full-stack performante con SvelteKit y Go
- Implementar asistencia financiera con IA usando análisis de historial de transacciones
- Diseñar un dashboard intuitivo con analíticas significativas
- Soportar múltiples cuentas, categorías y transacciones recurrentes
- Entregar tiempos de respuesta de API menores a 100ms para operaciones core

---

## Stack Tecnológico

| Tecnología | Rol |
| ---------- | --- |
| **SvelteKit** | Framework frontend con SSR y rutas basadas en archivos |
| **Go** | Servicio backend para procesamiento de datos de alto rendimiento |
| **Chi** | Router HTTP ligero para la API en Go |
| **PostgreSQL** | Base de datos primaria para transacciones y datos de usuario |
| **OpenAI API** | Insights y recomendaciones financieras con IA |
| **TailwindCSS** | Estilos de UI con design tokens personalizados |

---

## Arquitectura

La aplicación sigue una separación limpia entre frontend y backend:

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

El backend en Go maneja toda la lógica de negocio, autenticación y persistencia de datos. La capa de IA procesa el historial de transacciones de forma asíncrona para generar insights periódicos sin bloquear el flujo principal del usuario.

---

## Características Principales

### Gestión Multi-Cuenta

Los usuarios pueden rastrear finanzas en cuentas corrientes, ahorros, tarjetas de crédito y efectivo — cada una con su propio saldo e historial de transacciones. Un dashboard unificado agrega totales de todas las cuentas.

### Transacciones Categorizadas

Cada transacción se asigna a una categoría (comida, transporte, entretenimiento, etc.) ya sea manualmente o mediante sugerencias inteligentes. Las categorías alimentan el motor de analíticas y las recomendaciones de IA.

### Asesor Financiero con IA

La característica destacada: un asistente de IA que analiza patrones de gasto y proporciona consejos personalizados y accionables. Identifica tendencias como:

- Picos inusuales de gasto en categorías específicas
- Oportunidades de ahorro basadas en patrones recurrentes
- Recomendaciones de presupuesto mensual basadas en ingresos y metas

### Dashboard de Analíticas

Desgloses visuales de gasto por categoría, período de tiempo y cuenta. Incluye:

- Tendencias de gasto mensual (gráficos de línea)
- Distribución por categoría (gráficos de dona)
- Comparación de ingresos vs. gastos
- Indicadores de progreso de presupuesto

### Transacciones Recurrentes

Soporte para transacciones programadas (arriendo, suscripciones, salario) que se auto-registran en sus fechas de vencimiento, manteniendo el libro mayor preciso sin entrada manual.

---

## Desafíos y Soluciones

### Desafío: Cálculos de Saldo en Tiempo Real

Con miles de transacciones en múltiples cuentas, calcular saldos necesitaba ser instantáneo. Los enfoques ingenuos (sumar todas las transacciones por request) degradaban rápidamente.

**Solución:** Implementé una estrategia de **saldo corrido** donde cada transacción almacena el saldo resultante. Los saldos de cuenta se desnormalizan y actualizan transaccionalmente, asegurando lookups de saldo O(1) mientras se mantiene la consistencia.

### Desafío: Insights de IA Significativos

Las primeras iteraciones de la función de IA producían consejos genéricos ("gasta menos en restaurantes"). Los usuarios necesitaban recomendaciones específicas y contextuales.

**Solución:** Diseñé prompts detallados que incluyen resúmenes mensuales categorizados, deltas de gasto y metas definidas por el usuario. La IA ahora produce insights como: "Tu gasto en supermercado aumentó 23% este mes comparado con tu promedio de 3 meses. Considera planificar comidas los domingos — usuarios con perfiles similares ahorran ~$80.000/mes de esta forma."

### Desafío: Comunicación Go + SvelteKit

La seguridad de tipos entre la API en Go y el frontend en SvelteKit requería coordinación cuidadosa para prevenir divergencia entre las formas de request/response.

**Solución:** Definí contratos de API compartidos usando specs OpenAPI, generando tipos TypeScript para el frontend y validando handlers de Go contra el mismo esquema. Cualquier cambio de contrato se detecta en tiempo de build.

---

## Esquema de Base de Datos (Simplificado)

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

---

## Rendimiento

| Métrica | Objetivo | Logrado |
| ------- | -------- | ------- |
| Respuesta API (p95) | < 100ms | 47ms |
| Carga del dashboard | < 1.5s | 1.1s |
| Creación de transacción | < 200ms | 89ms |
| Generación de insight IA | < 5s | ~3.2s |

---

## Lecciones Aprendidas

1. **Go es excelente para APIs financieras** — El sistema de tipos detecta errores de precisión en tiempo de compilación, y las goroutines manejan cálculos de saldo concurrentes elegantemente.
2. **Las features de IA necesitan guardrails** — Sin prompts estructurados y validación de output, las respuestas de LLM son demasiado genéricas para ser útiles. La ingeniería de contexto importa más que la elección del modelo.
3. **La reactividad de SvelteKit brilla para dashboards** — Los stores derivados y las declaraciones reactivas hacen que las actualizaciones de gráficos se sientan instantáneas sin gestión de estado manual.
4. **Empezar por el modelo de datos** — Definir correctamente el esquema de transacciones/cuentas temprano previno migraciones costosas después.

---

## Próximos Pasos

- [ ] Sincronización de cuentas bancarias vía integración con Plaid
- [ ] Definición de metas de presupuesto con notificaciones de progreso
- [ ] Cuentas compartidas del hogar
- [ ] App móvil con Flutter (backend compartido)
- [ ] Exportación a CSV/PDF para temporada de impuestos
