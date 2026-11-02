---
title: "Volo"
description: "App de gimnasio para crear rutinas por sección corporal, seguimiento nutricional, tutoriales de ejercicios con músculos objetivo y registro de progreso de peso a lo largo del tiempo."
image: "/images/projects/volo/front.png"
tags: ["Flutter", "FastAPI", "Python", "Mobile"]
order: 4
url: "/es/projects/volo"
repo: ""
---

## Resumen

Volo es una aplicación móvil de acompañamiento para el gimnasio que quita las dudas del entrenamiento. En una sola app puedes armar rutinas estructuradas, seguir tutoriales que muestran qué músculos trabaja cada ejercicio, registrar lo que comes y ver la evolución de tu peso. La idea es que no necesites un entrenador personal para saber qué hacer en el gimnasio.

## El problema

La mayoría de quienes van al gimnasio se topan con las mismas frustraciones:

- Sin un plan, los entrenamientos terminan siendo improvisados y no dan resultados
- Hay cientos de ejercicios y es difícil saber cuáles trabajan lo que necesitas
- Las rutinas, la nutrición y el progreso suelen estar en aplicaciones distintas
- Sin registrar tu peso a lo largo del tiempo, no puedes saber si estás mejorando

Quería una sola aplicación que resolviera los cuatro problemas, con una interfaz móvil limpia y sin distracciones.

## Objetivos

- Construir una aplicación móvil multiplataforma con Flutter para iOS y Android
- Organizar el creador de rutinas por sección del cuerpo (empuje, tirón, piernas, etc.)
- Mostrar tutoriales de ejercicios con resaltado animado de los músculos involucrados
- Registrar la nutrición con el desglose de macros
- Registrar el peso y mostrar su tendencia en gráficos
- Mantener la aplicación rápida y usable sin conexión, porque en los gimnasios la señal suele ser mala

## Stack tecnológico

| Tecnología | Rol |
| ---------- | --- |
| **Flutter** | Framework de UI móvil multiplataforma |
| **Dart** | Lógica de aplicación y gestión de estado |
| **FastAPI** | Backend Python para API y procesamiento de datos |
| **PostgreSQL** | Base de datos para usuarios, rutinas y biblioteca de ejercicios |
| **SQLite** | Almacenamiento local del dispositivo para soporte offline |
| **Matplotlib** | Generación de gráficos de progreso del lado del servidor |

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

La aplicación está pensada primero para funcionar sin conexión. En la primera carga, las rutinas y los datos de ejercicios se copian a una base de datos SQLite local, así los usuarios pueden terminar un entrenamiento completo sin conexión, y sus datos se sincronizan cuando vuelven a tener internet.

## Funcionalidades

### Rutinas por sección del cuerpo

Los usuarios arman rutinas según los grupos musculares que quieren trabajar:

| Sección | Ejercicios Ejemplo |
| ------- | ------------------ |
| **Empuje** | Press banca, press militar, fondos en paralelas |
| **Tirón** | Peso muerto, remo con barra, dominadas |
| **Piernas** | Sentadillas, prensa de piernas, peso muerto rumano |
| **Core** | Planchas, crunch en polea, elevación de piernas colgando |
| **Brazos** | Curl de bíceps, rompecráneos, curl martillo |

Cada rutina permite:

- Ordenar los ejercicios como quieras
- Definir series, repeticiones y peso para cada ejercicio
- Usar un temporizador de descanso entre series
- Agregar notas a cada ejercicio

### Biblioteca de ejercicios con tutoriales

La biblioteca tiene más de 200 ejercicios, y cada uno incluye:

- Instrucciones escritas paso a paso
- Diagramas animados de los músculos principales y secundarios que trabaja
- Errores comunes que conviene evitar
- Alternativas para cuando no tienes el equipo indicado

### Registro de nutrición

El registro diario de comidas incluye:

- El desglose de proteínas, carbohidratos y grasas
- Las calorías comparadas con tu meta diaria
- Las comidas agrupadas en desayuno, almuerzo, cena y snacks
- Agregado rápido de los alimentos que registras seguido
- Resúmenes de nutrición semanales y mensuales

### Seguimiento del peso

Una sección aparte registra tu peso corporal a lo largo del tiempo:

- Registros diarios de peso
- Una línea de tendencia que suaviza las variaciones diarias
- Metas con una fecha estimada
- Promedios semanales, que reducen el ruido del peso por retención de agua
- Una línea de tiempo opcional con fotos de progreso

### Modo entrenamiento

Al iniciar una rutina, la aplicación pasa a una pantalla de entrenamiento enfocada:

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

## Problemas que tuve que resolver

### Sincronizar datos registrados sin conexión

Los gimnasios son conocidos por su mala señal, así que la aplicación tenía que funcionar por completo sin conexión y luego sincronizar sin perder datos ni generar conflictos. La sincronización usa la estrategia de "la última escritura gana" y resuelve los conflictos por marca de tiempo. SQLite guarda localmente todos los datos de entrenamiento con un indicador `synced`, y un isolate en segundo plano intenta sincronizar cada 30 segundos cuando hay conexión. Las acciones importantes, como crear rutinas y registrar series, nunca dependen de la red.

### Mostrar qué músculos trabaja un ejercicio

Esto requería ilustraciones anatómicas claras y consistentes que cambiaran según el ejercicio seleccionado. Hice un conjunto de mapas corporales en SVG donde cada grupo muscular se puede manejar por separado. Cada ejercicio apunta a los IDs de sus músculos principales (resaltados) y secundarios (atenuados), y el renderizado de SVG de Flutter pinta los grupos correspondientes, así no hicieron falta decenas de ilustraciones distintas.

### Manejar el estado de Flutter a medida que crecía la app

Cuando ya estaban las rutinas, la nutrición, el progreso y el modo entrenamiento, el manejo del estado en toda la aplicación se complicó. Pasé a Riverpod para la inyección de dependencias y el manejo de estado, con providers propios para cada funcionalidad y límites claros entre ellos. El estado del entrenamiento activo vive en un `StateNotifier` que se guarda en el almacenamiento local, así un entrenamiento sobrevive aunque el sistema cierre la aplicación a la mitad.

### Un temporizador de descanso confiable

En un gimnasio real, un temporizador de descanso que se desfasa o se detiene cuando la aplicación pasa a segundo plano no sirve de nada. El temporizador corre en un `Isolate` de Flutter y usa notificaciones locales para avisar en segundo plano. Calcula el tiempo restante a partir de una marca de tiempo de inicio guardada en lugar de hacer una cuenta regresiva, así se mantiene preciso sin importar lo que el sistema operativo haga con la aplicación.

## Modelo de datos (simplificado)

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

## Rendimiento

| Métrica | Objetivo | Logrado |
| ------- | -------- | ------- |
| Inicio en frío de app | < 2s | 1.4s |
| Carga de rutina (offline) | < 100ms | 45ms |
| Ciclo de sincronización | < 3s | ~1.8s |
| Búsqueda de ejercicios | < 200ms | 90ms |
| Frame rate (animaciones) | 60fps | 60fps |

## Lo que aprendí

1. Diseñar para el uso sin conexión desde el principio es mucho más fácil que agregarlo después, y obliga a separar con claridad el estado local de los datos del servidor.
2. Flutter y FastAPI funcionan bien juntos. El hot reload de Flutter y la documentación OpenAPI que genera FastAPI hicieron que el ciclo de desarrollo fuera muy rápido.
3. Una aplicación de gimnasio necesita botones grandes. Con las manos sudadas y miradas rápidas entre series, los botones tienen que ser grandes, el contraste alto y los errores fáciles de deshacer.
4. Los mapas musculares en SVG escalan bien. Un solo conjunto de recursos vectoriales funciona en cualquier tamaño y densidad de pantalla, y colorearlos desde el código reemplazó decenas de imágenes estáticas.
5. Los temporizadores de descanso son más difíciles de lo que parecen. Correr en segundo plano, los permisos de notificaciones y mantener la precisión durante los eventos del ciclo de vida del sistema operativo exigieron más trabajo del que esperaba.

## Próximos pasos

- [ ] Funciones sociales: compartir rutinas y seguir el progreso de tus amigos
- [ ] Rutinas sugeridas por IA según tus metas e historial
- [ ] Una app complementaria para Apple Watch y Wear OS que registre el entrenamiento activo
- [ ] Revisión de la técnica de los ejercicios con la cámara, usando estimación de pose
- [ ] Registro automático del peso desde básculas inteligentes
