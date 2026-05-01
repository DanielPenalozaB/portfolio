---
title: "Volo"
description: "App de gimnasio para crear rutinas por sección corporal, seguimiento nutricional, tutoriales de ejercicios con músculos objetivo y registro de progreso de peso a lo largo del tiempo."
image: "/images/projects/volo/front.png"
tags: ["Flutter", "FastAPI", "Python", "Mobile"]
url: "/es/projects/volo"
repo: ""
---

## Resumen

Volo es una app móvil companion de gimnasio diseñada para eliminar la improvisación del entrenamiento. Ayuda a los usuarios a **construir rutinas estructuradas**, seguir tutoriales de ejercicios con targeting de grupos musculares, rastrear ingesta nutricional y visualizar su progreso de peso a lo largo del tiempo — todo en una app simplificada.

> El gimnasio no debería requerir un entrenador personal para navegarlo. Volo pone la construcción de rutinas a nivel experto en el bolsillo de todos.

---

## El Problema

La mayoría de personas que van al gimnasio enfrentan un conjunto común de frustraciones:

- **Sin estructura** — Entrar al gimnasio sin plan lleva a entrenamientos aleatorios e inefectivos
- **Sobrecarga de información** — Existen cientos de ejercicios, pero ¿cuáles trabajan lo que necesitas?
- **Herramientas fragmentadas** — Apps separadas para rutinas, nutrición y seguimiento de progreso generan fricción
- **Sin progresión** — Sin rastrear peso a lo largo del tiempo, es imposible saber si estás mejorando

Quería una sola app que aborde los cuatro problemas con una experiencia móvil limpia y libre de distracciones.

---

## Objetivos

- Construir una app móvil multiplataforma con Flutter para iOS y Android
- Diseñar un constructor de rutinas organizado por secciones corporales (empuje, tirón, piernas, etc.)
- Incluir tutoriales de ejercicios con resaltado animado de grupos musculares
- Implementar un tracker nutricional con desglose de macros
- Crear un registro de progreso de peso con gráficos de tendencia visual
- Entregar una experiencia rápida y capaz de funcionar offline para ambientes de gimnasio

---

## Stack Tecnológico

| Tecnología | Rol |
| ---------- | --- |
| **Flutter** | Framework de UI móvil multiplataforma |
| **Dart** | Lógica de aplicación y gestión de estado |
| **FastAPI** | Backend Python para API y procesamiento de datos |
| **PostgreSQL** | Base de datos para usuarios, rutinas y biblioteca de ejercicios |
| **SQLite** | Almacenamiento local del dispositivo para soporte offline |
| **Matplotlib** | Generación de gráficos de progreso del lado del servidor |

---

## Arquitectura

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Flutter App    │────▶│   FastAPI        │────▶│  PostgreSQL  │
│   (iOS/Android)  │◀────│   /api/v1/*      │◀────│              │
└────────┬─────────┘     └──────────────────┘     └──────────────┘
         │
         ▼
┌──────────────────┐
│   SQLite Local   │
│   (Caché Offline)│
└──────────────────┘
```

La app sigue una estrategia **offline-first** — las rutinas y datos de ejercicios se sincronizan a SQLite local en la primera carga. Los usuarios pueden completar entrenamientos completos sin conectividad; los datos se sincronizan cuando la conexión se restablece.

---

## Características Principales

### Constructor de Rutinas por Sección Corporal

Los usuarios crean rutinas organizadas por targeting de grupo muscular:

| Sección | Ejercicios Ejemplo |
| ------- | ------------------ |
| **Empuje** | Press banca, press militar, fondos en paralelas |
| **Tirón** | Peso muerto, remo con barra, dominadas |
| **Piernas** | Sentadillas, prensa de piernas, peso muerto rumano |
| **Core** | Planchas, crunch en polea, elevación de piernas colgando |
| **Brazos** | Curl de bíceps, rompecráneos, curl martillo |

Cada rutina soporta:
- Orden personalizado de ejercicios
- Configuración de series/repeticiones/peso por ejercicio
- Temporizador de descanso entre series
- Notas por ejercicio

### Biblioteca de Ejercicios con Tutoriales

Una base de datos completa de 200+ ejercicios, cada uno con:

- Instrucciones paso a paso en texto
- Diagramas animados de grupos musculares mostrando músculos primarios y secundarios
- Errores comunes a evitar
- Alternativas sugeridas para limitaciones de equipo

### Tracker Nutricional

Registro diario de alimentos con:

- Desglose de macros (proteína, carbohidratos, grasas)
- Seguimiento calórico contra objetivos diarios
- Categorización de comidas (desayuno, almuerzo, cena, snacks)
- Adición rápida para alimentos registrados frecuentemente
- Resúmenes de nutrición semanal/mensual

### Seguimiento de Progreso de Peso

Una sección dedicada para registrar peso corporal a lo largo del tiempo:

- Registro diario de pesaje
- Gráfico de línea de tendencia suavizando fluctuaciones diarias
- Definición de metas con timeline proyectado
- Promedios semanales para reducir ruido de retención de agua
- Timeline de fotos de progreso (opcional)

### Modo de Entrenamiento Activo

Cuando se inicia una rutina, la app entra en un modo de entrenamiento enfocado:

```
┌─────────────────────────────┐
│  Press Banca          3/4   │
│  ─────────────────────────  │
│  Serie 1: 80kg × 10 ✓      │
│  Serie 2: 85kg × 8  ✓      │
│  Serie 3: 85kg × _  ← act  │
│  Serie 4: 80kg × 10         │
│  ─────────────────────────  │
│  Descanso: 1:23 restante   │
│  [Completar Serie]         │
└─────────────────────────────┘
```

---

## Desafíos y Soluciones

### Desafío: Sincronización de Datos Offline-First

Los ambientes de gimnasio tienen conectividad notoriamente pobre. La app necesitaba funcionar completamente offline, luego sincronizar sin pérdida de datos ni conflictos.

**Solución:** Implementé una estrategia de sincronización **last-write-wins** con resolución de conflictos basada en timestamps. SQLite local almacena todos los datos de entrenamiento con un flag `synced`. Un isolate en segundo plano intenta sincronizar cada 30 segundos cuando hay conectividad disponible. Las operaciones críticas (crear rutinas, registrar series) nunca dependen de la red.

### Desafío: Visualización de Grupos Musculares

Mostrar qué músculos trabaja un ejercicio requería ilustraciones anatómicas claras y consistentes que respondieran al ejercicio seleccionado.

**Solución:** Creé un conjunto de **mapas corporales SVG** con grupos musculares direccionables individualmente. Cada ejercicio mapea a IDs de músculos primarios (resaltados) y secundarios (atenuados). El renderizado SVG de Flutter pinta los grupos relevantes, produciendo un visual claro sin requerir docenas de ilustraciones individuales.

### Desafío: Gestión de Estado en Flutter a Escala

A medida que las features crecían (rutinas + nutrición + progreso + modo entrenamiento), gestionar estado a través de la app se volvió complejo.

**Solución:** Adopté **Riverpod** para inyección de dependencias y gestión de estado. Cada dominio de feature tiene sus propios providers con límites claros. El estado del entrenamiento activo usa un `StateNotifier` que persiste en almacenamiento local, sobreviviendo kills de la app a mitad de entrenamiento.

### Desafío: Precisión del Temporizador de Descanso

Un temporizador de descanso que se desfasa o se detiene cuando la app está en segundo plano es inútil en un escenario real de gimnasio.

**Solución:** Usé `Isolate` de Flutter para el cómputo del timer y notificaciones locales para alertas en background. El timer calcula el tiempo restante desde un timestamp de inicio almacenado en lugar de contar hacia atrás, asegurando precisión independientemente de eventos del ciclo de vida de la app.

---

## Modelo de Datos (Simplificado)

```python
class Routine(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    section: str  # "push" | "pull" | "legs" | "core" | "arms"
    exercises: list[RoutineExercise]

class RoutineExercise(BaseModel):
    exercise_id: UUID
    order: int
    sets: int
    target_reps: int
    target_weight: float | None
    rest_seconds: int

class WorkoutLog(BaseModel):
    id: UUID
    routine_id: UUID
    started_at: datetime
    completed_at: datetime | None
    sets: list[SetLog]

class SetLog(BaseModel):
    exercise_id: UUID
    set_number: int
    weight: float
    reps: int
    completed_at: datetime
```

---

## Rendimiento

| Métrica | Objetivo | Logrado |
| ------- | -------- | ------- |
| Inicio en frío de app | < 2s | 1.4s |
| Carga de rutina (offline) | < 100ms | 45ms |
| Ciclo de sincronización | < 3s | ~1.8s |
| Búsqueda de ejercicios | < 200ms | 90ms |
| Frame rate (animaciones) | 60fps | 60fps |

---

## Lecciones Aprendidas

1. **Offline-first cambia todo** — Diseñar para offline desde el día uno es inmensamente más fácil que retrofitear. Fuerza una separación limpia entre estado local y verdad remota.
2. **Flutter + FastAPI es una gran combinación** — La velocidad de hot reload de Flutter y los docs OpenAPI auto-generados de FastAPI hacen el loop de desarrollo extremadamente rápido.
3. **La UX de gimnasio necesita targets de toque grandes** — Manos sudorosas y miradas rápidas entre series significan que los botones necesitan ser grandes, el contraste alto y las interacciones tolerantes.
4. **Los mapas musculares SVG escalan hermosamente** — Un conjunto de assets vectoriales funciona en todos los tamaños y densidades de pantalla, con coloreo programático reemplazando docenas de imágenes estáticas.
5. **Los temporizadores de descanso son deceptivamente complejos** — La ejecución en background, permisos de notificación y precisión del timer a través de eventos del ciclo de vida del OS requirieron más ingeniería de la esperada.

---

## Próximos Pasos

- [ ] Features sociales (compartir rutinas, seguir progreso de amigos)
- [ ] Sugerencias de rutinas con IA basadas en metas e historial
- [ ] Companion para Apple Watch / Wear OS para tracking de entrenamiento activo
- [ ] Chequeo de forma de ejercicio vía cámara del dispositivo y estimación de pose
- [ ] Integración con básculas inteligentes para registro automático de peso
