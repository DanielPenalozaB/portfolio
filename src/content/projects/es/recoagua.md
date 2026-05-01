---
title: "RecoAgua"
description: "Plataforma educativa para el uso responsable del agua en Cali, Colombia. Incluye guías interactivas, gamificación con insignias y retos, calculadora de consumo hídrico, mapa interactivo con indicadores por zonas y un panel administrativo completo."
image: "/images/projects/recoagua/front.png"
tags: ["Next.js", "NestJS", "PostgreSQL", "Gamificación"]
url: "/es/projects/recoagua"
repo: "https://github.com/DanielPenalozaB/recoagua-fe"
---

## Resumen

RecoAgua es una plataforma educativa dirigida a promover el consumo responsable de agua en Cali, Colombia. A través de **gamificación**, herramientas interactivas y datos localizados, empodera a los ciudadanos para entender su huella hídrica y tomar acciones concretas para reducirla.

> La escasez de agua no es solo un problema futuro — está ocurriendo ahora. RecoAgua hace la conservación tangible, medible e incluso divertida.

---

## El Problema

Cali enfrenta eventos recurrentes de estrés hídrico, pero la mayoría de ciudadanos carecen de conciencia sobre sus patrones de consumo personal. Las campañas de conservación existentes son pasivas (afiches, anuncios de TV) y producen mínimo cambio de comportamiento. La ciudad necesitaba:

- Una forma atractiva de educar a los residentes sobre el uso del agua
- Herramientas para medir y reducir el consumo personal
- Datos localizados mostrando qué barrios enfrentan mayor riesgo
- Un sistema que recompense esfuerzos consistentes de conservación

---

## Objetivos

- Crear una plataforma educativa atractiva que impulse cambio real de comportamiento
- Implementar mecánicas de gamificación (insignias, retos, tablas de clasificación) para sostener el engagement
- Construir una calculadora de consumo hídrico interactiva con recomendaciones personalizadas
- Desarrollar un mapa de la ciudad con indicadores de estrés hídrico por zona
- Proveer a los administradores un panel completo de gestión de contenido
- Hacer la plataforma accesible para usuarios de todos los niveles técnicos

---

## Stack Tecnológico

| Tecnología | Rol |
| ---------- | --- |
| **Next.js** | Frontend con SSR para SEO y contenido dinámico |
| **NestJS** | Framework backend con arquitectura modular |
| **PostgreSQL** | Base de datos relacional para usuarios, retos y datos zonales |
| **Leaflet** | Mapa interactivo de la ciudad con overlays por zona |
| **Chart.js** | Visualizaciones de consumo y gráficos de progreso |
| **TailwindCSS** | Estilos de UI responsivos |
| **JWT** | Autenticación para usuarios y panel administrativo |

---

## Arquitectura

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Next.js App    │────▶│   NestJS API     │────▶│  PostgreSQL  │
│   (SSR + CSR)    │◀────│   /api/v1/*      │◀────│              │
└──────────────────┘     └──────────────────┘     └──────────────┘
        │                         │
        ▼                         ▼
┌──────────────────┐     ┌──────────────────┐
│   Mapa Leaflet   │     │   Panel Admin    │
│   (Datos Zona)   │     │   (CMS + Stats)  │
└──────────────────┘     └──────────────────┘
```

El backend en NestJS sigue un patrón de **monolito modular** — cada dominio (usuarios, retos, zonas, calculadora) es un módulo independiente con sus propias capas de servicio, controlador y repositorio.

---

## Características Principales

### Guías Interactivas

Contenido educativo paso a paso cubriendo temas de conservación del agua:

- Técnicas de ahorro de agua en el hogar
- Entendiendo tu factura del agua
- Estrategias de conservación estacional
- Iniciativas a nivel comunitario

Cada guía rastrea el progreso de completado y otorga XP al finalizar.

### Sistema de Gamificación

El loop principal de engagement gira alrededor de:

| Elemento | Descripción |
| -------- | ----------- |
| **Insignias** | Ganadas al completar guías, retos o hitos |
| **Retos** | Tareas con tiempo limitado (ej. "Reduce consumo 10% esta semana") |
| **XP y Niveles** | Acumulados a través de todas las actividades, desbloqueando nuevo contenido |
| **Tablas de Clasificación** | Rankings por zona y a nivel ciudad |

### Calculadora de Consumo Hídrico

Los usuarios ingresan detalles de su hogar (número de residentes, electrodomésticos, hábitos) y reciben:

- Consumo estimado diario/mensual en litros
- Comparación contra promedios de la ciudad
- Recomendaciones personalizadas de reducción
- Ahorros proyectados en litros y costo

### Mapa Interactivo de la Ciudad

Un mapa de Cali potenciado por Leaflet mostrando:

- Zonas codificadas por color según nivel de estrés hídrico (verde → rojo)
- Promedios de consumo por zona
- Indicadores de estado de infraestructura
- Datos de tendencia histórica al hacer hover

### Panel Administrativo

Un CMS completo para administradores de la plataforma:

- Crear/editar/publicar guías educativas
- Gestionar retos y criterios de insignias
- Monitorear métricas de engagement de usuarios
- Actualizar datos zonales e indicadores del mapa
- Ver analíticas a nivel plataforma

---

## Desafíos y Soluciones

### Desafío: Gamificación Que No Sea Superficial

Muchas apps "gamificadas" pegan puntos a las acciones sin progresión significativa. Los usuarios se desenganchan una vez que la novedad pasa.

**Solución:** Diseñé un sistema de progresión donde las recompensas desbloquean _valor real_ — nuevas funciones de la calculadora, guías avanzadas, retos comunitarios. Las insignias representan logros genuinos (ej. "Ahorraste 1000L" requiere reducción real rastreada). La tabla de clasificación usa zonas para crear competencia amistosa entre barrios.

### Desafío: Estimaciones de Consumo Precisas

El uso de agua varía enormemente por composición del hogar, clima e infraestructura. Una calculadora genérica sería inútil.

**Solución:** Construí un modelo multifactorial calibrado contra datos municipales de agua de Cali. Los factores incluyen: número de residentes, duración/frecuencia de duchas, tipos de electrodomésticos (lavadora, lavavajillas), tamaño del jardín y precipitación estacional. Los resultados se validan contra datos de facturación anonimizados de la empresa local de servicios.

### Desafío: Rendimiento del Mapa con Datos Densos de Zonas

Renderizar cientos de polígonos con overlays de datos en tiempo real causaba lag significativo en dispositivos móviles.

**Solución:** Implementé **carga progresiva** — el mapa inicialmente renderiza límites de zona con datos de color en caché, luego obtiene estadísticas detalladas al hacer zoom/click. Los vector tiles reemplazaron GeoJSON para renderizado de límites, reduciendo el payload en 85%.

### Desafío: Flujo de Contenido Administrativo

Los administradores necesitaban crear contenido educativo sin conocimiento técnico, pero el contenido requería formato enriquecido (imágenes, callouts, calculadoras embebidas).

**Solución:** Construí un editor basado en bloques inspirado en Notion, donde los administradores componen guías a partir de tipos de bloque predefinidos (texto, imagen, quiz, tip, embed de calculadora). Cada bloque tiene su propia validación y vista previa, haciendo la creación de contenido intuitiva mientras mantiene formato consistente.

---

## Esquema de Base de Datos (Simplificado)

```sql
CREATE TABLE users (
    id          UUID PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(100) NOT NULL,
    zone_id     UUID REFERENCES zones(id),
    xp          INTEGER DEFAULT 0,
    level       INTEGER DEFAULT 1
);

CREATE TABLE challenges (
    id          UUID PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    xp_reward   INTEGER NOT NULL,
    target      JSONB NOT NULL, -- { metric, threshold, duration }
    starts_at   TIMESTAMP NOT NULL,
    ends_at     TIMESTAMP NOT NULL
);

CREATE TABLE zones (
    id              UUID PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    geometry        GEOMETRY(Polygon, 4326),
    stress_level    VARCHAR(20) NOT NULL,
    avg_consumption DECIMAL(10,2)
);
```

---

## Métricas de Impacto

| Métrica | Resultado |
| ------- | --------- |
| Usuarios registrados | 2.400+ |
| Guías completadas | 8.500+ |
| Reducción promedio reportada | 12% consumo mensual |
| Participantes activos en retos | 340/mes |
| Guías publicadas por admin | 45 |

---

## Lecciones Aprendidas

1. **La gamificación necesita motivación intrínseca** — Los puntos solos no impulsan cambio de comportamiento. Conectar recompensas a resultados del mundo real (facturas más bajas, impacto comunitario) sostiene el engagement.
2. **Los módulos de NestJS escalan bien** — El enfoque de monolito modular mantuvo el codebase organizado a medida que las features crecían, sin el overhead de microservicios.
3. **Los mapas son costosos en móvil** — Vector tiles y carga progresiva son esenciales para aplicaciones con mapas dirigidas a una audiencia mobile-first.
4. **Los datos locales generan confianza** — Los usuarios se engancharon más cuando veían datos de su propio barrio en lugar de estadísticas genéricas de toda la ciudad.
5. **La UX del admin importa tanto como la del usuario** — Si los creadores de contenido no pueden publicar fácilmente, la plataforma se estanca sin importar qué tan buena sea la experiencia de usuario.

---

## Próximos Pasos

- [ ] Notificaciones push para recordatorios de retos activos
- [ ] Integración con la API de facturación de la empresa de agua local
- [ ] Foros comunitarios por zona para compartir tips de conservación
- [ ] Modo offline para áreas con conectividad limitada
- [ ] Programa de alianza con colegios con retos de aula
