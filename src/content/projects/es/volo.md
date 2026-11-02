---
title: "Volo"
description: "Un concepto de aplicación de acompañamiento para el gimnasio: rutinas por sección del cuerpo, tutoriales que muestran los músculos que trabaja cada ejercicio, registro de nutrición y progreso del peso. Diseñada, todavía sin construir."
image: "/images/projects/volo/front.png"
tags: ["Concepto", "Flutter", "FastAPI", "Móvil"]
order: 6
url: "/es/projects/volo"
repo: ""
---

## Estado

Volo es un concepto. Ya definí el problema, las funcionalidades, las pantallas y la arquitectura, pero todavía no lo he construido, así que todo lo que sigue describe el plan.

## La idea

Volo es una aplicación móvil de acompañamiento para el gimnasio pensada para quitar las dudas del entrenamiento. En una sola app podrías armar rutinas estructuradas, seguir tutoriales que muestran qué músculos trabaja cada ejercicio, registrar lo que comes y ver la evolución de tu peso. La meta es que no necesites un entrenador personal para saber qué hacer en el gimnasio.

## El problema

La mayoría de quienes van al gimnasio se topan con las mismas frustraciones:

- Sin un plan, los entrenamientos terminan siendo improvisados y no dan resultados
- Hay cientos de ejercicios y es difícil saber cuáles trabajan lo que necesitas
- Las rutinas, la nutrición y el progreso suelen estar en aplicaciones distintas
- Sin registrar tu peso a lo largo del tiempo, no puedes saber si estás mejorando

Quiero una sola aplicación que resuelva los cuatro problemas, con una interfaz móvil limpia y sin distracciones.

## Funcionalidades planeadas

### Rutinas por sección del cuerpo

Los usuarios armarían rutinas según los grupos musculares que quieren trabajar:

| Sección | Ejercicios Ejemplo |
| ------- | ------------------ |
| **Empuje** | Press banca, press militar, fondos en paralelas |
| **Tirón** | Peso muerto, remo con barra, dominadas |
| **Piernas** | Sentadillas, prensa de piernas, peso muerto rumano |
| **Core** | Planchas, crunch en polea, elevación de piernas colgando |
| **Brazos** | Curl de bíceps, rompecráneos, curl martillo |

Cada rutina permitiría ordenar los ejercicios a gusto, definir series, repeticiones y peso para cada uno, usar un temporizador de descanso entre series y agregar notas.

### Biblioteca de ejercicios con tutoriales

Cada ejercicio incluiría instrucciones paso a paso, diagramas animados de los músculos principales y secundarios que trabaja, errores comunes y alternativas para cuando no tienes el equipo indicado.

### Nutrición y peso

Un registro diario de comidas con el desglose de proteínas, carbohidratos y grasas, las calorías frente a una meta diaria y agregado rápido de los alimentos frecuentes. Un registro de peso aparte trazaría una línea de tendencia que suaviza las variaciones diarias, con promedios semanales y metas con una fecha estimada.

### Modo entrenamiento

Al iniciar una rutina, la aplicación pasaría a una pantalla de entrenamiento enfocada:

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

## Arquitectura planeada

| Tecnología | Rol |
| ---------- | --- |
| **Flutter** | Framework de UI móvil multiplataforma |
| **Dart** | Lógica de aplicación y gestión de estado |
| **FastAPI** | Backend Python para API y procesamiento de datos |
| **PostgreSQL** | Base de datos para usuarios, rutinas y biblioteca de ejercicios |
| **SQLite** | Almacenamiento local del dispositivo para soporte offline |
| **Matplotlib** | Generación de gráficos de progreso del lado del servidor |

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

La aplicación funcionaría primero sin conexión. En los gimnasios la señal suele ser mala, así que las rutinas y los datos de ejercicios se copiarían a una base de datos SQLite local, y los entrenamientos se sincronizarían cuando vuelva la conexión.

Los enfoques que planeo para las partes difíciles:

- Sincronización: "la última escritura gana" con marcas de tiempo, un indicador `synced` en los registros locales y un isolate en segundo plano que reintenta periódicamente. Crear rutinas y registrar series nunca esperaría a la red.
- Diagramas musculares: mapas corporales en SVG donde cada grupo muscular se puede colorear por separado, así un solo juego de dibujos sirve para todos los ejercicios.
- Estado: Riverpod, con el entrenamiento activo guardado en el almacenamiento local para que sobreviva aunque se cierre la aplicación a la mitad.
- Temporizador de descanso: calcular el tiempo restante a partir de una marca de tiempo de inicio guardada en lugar de hacer una cuenta regresiva, con notificaciones locales cuando la aplicación está en segundo plano.

## Borrador del modelo de datos

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
