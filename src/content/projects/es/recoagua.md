---
title: "RecoAgua"
description: "Plataforma educativa para el uso responsable del agua en Cali, Colombia. Incluye guías interactivas, gamificación con insignias y retos, calculadora de consumo hídrico, mapa interactivo con indicadores por zonas y un panel administrativo completo."
image: "/images/projects/recoagua/front.png"
tags: ["Next.js", "NestJS", "PostgreSQL", "Gamificación"]
order: 2
url: "/es/projects/recoagua"
repo: "https://github.com/DanielPenalozaB/recoagua-fe"
---

## Resumen

RecoAgua es una plataforma educativa que promueve el uso responsable del agua en Cali, Colombia. Usa gamificación, herramientas interactivas y datos locales para que las personas entiendan cuánta agua consumen y logren consumir menos.

## El problema

Cali atraviesa periodos recurrentes de estrés hídrico, pero la mayoría de sus habitantes no conoce sus propios patrones de consumo. Las campañas de ahorro han sido sobre todo pasivas, como afiches y comerciales de televisión, y cambian poco la forma en que la gente actúa. La ciudad necesitaba:

- Una forma atractiva de enseñarles a los habitantes sobre el uso del agua
- Herramientas para medir el consumo personal y reducirlo
- Datos locales que muestren qué barrios enfrentan mayor riesgo
- Un sistema que premie a quienes ahorran agua de forma constante

## Objetivos

- Construir una plataforma educativa que cambie cómo la gente usa el agua en la práctica
- Hacer que los usuarios vuelvan con insignias, retos y tablas de clasificación
- Construir una calculadora de consumo de agua con recomendaciones personalizadas
- Mapear el estrés hídrico zona por zona en toda la ciudad
- Darles a los administradores un panel completo de gestión de contenido
- Hacer que la plataforma sea fácil de usar para personas con cualquier nivel técnico

## Stack tecnológico

| Tecnología | Rol |
| ---------- | --- |
| **Next.js** | Frontend con SSR para SEO y contenido dinámico |
| **NestJS** | Framework backend con arquitectura modular |
| **PostgreSQL** | Base de datos relacional para usuarios, retos y datos zonales |
| **Leaflet** | Mapa interactivo de la ciudad con overlays por zona |
| **Chart.js** | Visualizaciones de consumo y gráficos de progreso |
| **TailwindCSS** | Estilos de UI responsivos |
| **JWT** | Autenticación para usuarios y panel administrativo |

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

El backend en NestJS es un monolito modular: cada dominio (usuarios, retos, zonas, calculadora) es un módulo independiente, con sus propias capas de servicio, controlador y repositorio.

## Funcionalidades

### Guías interactivas

Guías paso a paso que cubren temas de ahorro de agua:

- Cómo ahorrar agua en casa
- Cómo entender tu factura de agua
- Ahorro según la temporada
- Iniciativas comunitarias

Cada guía registra tu progreso y te da XP cuando la terminas.

### Gamificación

El ciclo de participación se construye con estas piezas:

| Elemento | Descripción |
| -------- | ----------- |
| **Insignias** | Ganadas al completar guías, retos o hitos |
| **Retos** | Tareas con tiempo limitado (ej. "Reduce consumo 10% esta semana") |
| **XP y Niveles** | Acumulados a través de todas las actividades, desbloqueando nuevo contenido |
| **Tablas de Clasificación** | Rankings por zona y a nivel ciudad |

### Calculadora de consumo de agua

Los usuarios ingresan datos de su hogar (número de residentes, electrodomésticos, hábitos) y obtienen:

- Su consumo diario y mensual estimado en litros
- Una comparación con el promedio de la ciudad
- Recomendaciones personalizadas para consumir menos
- El ahorro proyectado, en litros y en dinero

### Mapa interactivo de la ciudad

Un mapa de Cali hecho con Leaflet muestra:

- Las zonas coloreadas según su nivel de estrés hídrico, de verde a rojo
- El consumo promedio por zona
- El estado de la infraestructura
- Tendencias históricas al pasar el cursor sobre una zona

### Panel de administración

Los administradores tienen un CMS completo donde pueden:

- Crear, editar y publicar guías educativas
- Gestionar los retos y los criterios de cada insignia
- Monitorear cómo participan los usuarios en la plataforma
- Actualizar los datos de las zonas y los indicadores del mapa
- Ver la analítica de toda la plataforma

## Problemas que tuve que resolver

### Una gamificación con sustancia

Muchas aplicaciones "gamificadas" ponen puntos a las acciones sin ninguna progresión real, y la gente pierde el interés cuando pasa la novedad. En RecoAgua, las recompensas desbloquean cosas útiles: nuevas funciones de la calculadora, guías avanzadas y retos comunitarios. Las insignias representan logros reales; "Ahorré 1000L", por ejemplo, exige una reducción que la aplicación haya registrado. Las tablas de clasificación se agrupan por zona, lo que genera una competencia amistosa entre barrios.

### Estimaciones de consumo precisas

El consumo de agua varía mucho según el tamaño del hogar, el clima y la infraestructura, así que una calculadora genérica no serviría de nada. Construí un modelo con varios factores, calibrado con datos municipales de agua de Cali: número de residentes, duración y frecuencia de las duchas, electrodomésticos como la lavadora y el lavavajillas, tamaño del jardín y lluvias de cada temporada. Sus resultados se validan con datos de facturación anonimizados de la empresa de servicios local.

### Rendimiento del mapa con muchos datos por zona

Dibujar cientos de polígonos con capas de datos en tiempo real hacía que el mapa se trabara bastante en los celulares. Ahora carga de forma progresiva: primero los límites de las zonas con colores en caché y luego las estadísticas detalladas cuando haces zoom o clic. Pasar los límites de GeoJSON a tiles vectoriales redujo el tamaño de la carga en un 85%.

### Flujo de contenido para administradores

Los administradores necesitaban escribir guías sin conocimientos técnicos, pero las guías requerían formato enriquecido como imágenes, recuadros destacados y calculadoras integradas. Construí un editor por bloques inspirado en Notion. Los administradores arman cada guía con bloques predefinidos (texto, imagen, quiz, consejo, calculadora integrada), y cada bloque tiene su propia validación y vista previa, así que todas las guías quedan con un formato consistente.

## Esquema de base de datos (simplificado)

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

## Impacto

| Métrica | Resultado |
| ------- | --------- |
| Usuarios registrados | 2.400+ |
| Guías completadas | 8.500+ |
| Reducción promedio reportada | 12% consumo mensual |
| Participantes activos en retos | 340/mes |
| Guías publicadas por admin | 45 |

## Lo que aprendí

1. Los puntos por sí solos no cambian el comportamiento. Lo que mantiene a la gente participando es conectar las recompensas con resultados reales, como facturas más bajas y un impacto visible en la comunidad.
2. Los módulos de NestJS escalaron bien. El monolito modular mantuvo el código organizado a medida que crecían las funcionalidades, sin la carga de los microservicios.
3. Los mapas son costosos en móviles. En una aplicación centrada en un mapa y pensada para celulares, los tiles vectoriales y la carga progresiva fueron necesarios.
4. Los datos locales generan confianza. La gente participó más cuando vio los números de su propio barrio en lugar de estadísticas de toda la ciudad.
5. La experiencia de los administradores importa tanto como la de los usuarios. Si quienes crean el contenido no pueden publicar con facilidad, la plataforma se estanca, sin importar qué tan bueno sea el resto.

## Próximos pasos

- [ ] Notificaciones que recuerden a los usuarios sus retos activos
- [ ] Integración con la API de facturación de la empresa de agua local
- [ ] Foros por zona donde los vecinos compartan consejos de ahorro
- [ ] Un modo sin conexión para zonas con mala conectividad
- [ ] Un programa para colegios con retos en el aula
