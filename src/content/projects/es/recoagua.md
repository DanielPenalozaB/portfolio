---
title: "RecoAgua"
description: "Mi tesis de Ingeniería de Sistemas: una plataforma web que ayuda a los hogares de Cali a recolectar y aprovechar el agua lluvia, con guías interactivas, una calculadora hídrica, un mapa de zonas de pluviosidad y progreso gamificado."
image: "/images/projects/recoagua/front.png"
tags: ["Next.js", "NestJS", "PostgreSQL", "Gamificación"]
order: 3
url: "/es/projects/recoagua"
repo: "https://github.com/DanielPenalozaB/recoagua-fe"
---

## Resumen

RecoAgua fue mi tesis de Ingeniería de Sistemas en la UNIAJC (Institución Universitaria Antonio José Camacho), desarrollada con Ismael Yate Calderón y dirigida por Beatriz E. Marín. Es una plataforma web que ayuda a los hogares de Cali, Colombia, a recolectar agua lluvia y usarla donde no hace falta agua potable, como en los sanitarios, el lavado de ropa y la limpieza.

Apoya a los hogares de cuatro formas: las guías interactivas informan, una calculadora estima cuánta agua lluvia podría recoger una vivienda, un mapa muestra las zonas de pluviosidad de la ciudad, y los puntos, niveles, insignias y retos motivan a seguir. Los administradores gestionan todo desde un mismo panel.

Está disponible en [recoagua.com](https://recoagua.com), y el código está en dos repositorios: el [frontend](https://github.com/DanielPenalozaB/recoagua-fe) y el [backend](https://github.com/DanielPenalozaB/recoagua-be).

## El problema

Los ríos de Cali se deterioran al atravesar la ciudad. Tres de los cuatro ríos principales salen de ella con un Índice de Calidad del Agua «malo», y Cali aporta cerca de la mitad de la contaminación del río Cauca. Las plantas de EMCALI toman el agua potable de esos mismos ríos.

Antes de escribir código, encuestamos a 410 hogares (95% de confianza y 5% de error):

| Pregunta                             | Resultado                                                  |
| ------------------------------------ | ---------------------------------------------------------- |
| ¿Cómo obtiene el agua su hogar?      | 88% del acueducto                                          |
| ¿Con qué frecuencia recibe el servicio? | 32% reporta interrupciones                              |
| ¿Tiene un sistema de almacenamiento? | 56,6% canecas, 12,2% tanques, 19,5% ninguno                |
| ¿En qué usa el agua?                 | Sanitarios 72,7%, ropa 65,4%, limpieza 55,9%               |
| ¿Aplica medidas para ahorrar agua?   | 43,9% no                                                   |
| ¿Cómo se conecta a internet?         | 82,9% por celular; 75,8% tiene un celular de gama baja o media |

La mayor parte del agua de los hogares va a usos donde el agua lluvia sirve, y muchos ya la almacenan, aunque de manera informal. Lo que faltaba era conocimiento y herramientas. Los datos de conectividad definieron el formato: una aplicación web liviana y pensada primero para el celular.

## Cómo lo construimos

Usamos ICONIX para el software, que va de los casos de uso a los diagramas de robustez y luego al diseño, y ADDIE para el contenido educativo. De ahí salieron 26 casos de uso, un prototipo de 13 pantallas en Figma y la trazabilidad de cada requerimiento hasta su prueba.

| Capa        | Tecnología                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Frontend    | Next.js 16, React 19, TanStack Query y Table, React Hook Form con Zod, Tailwind CSS, Mapbox GL, Recharts |
| Backend     | NestJS, TypeORM, documentación con Swagger, límite de peticiones, correos con Resend           |
| Base de datos | PostgreSQL                                                                                    |
| Seguridad   | bcrypt para las contraseñas, JWT de 1 hora con renovación, guards por rol, HTTPS               |
| Despliegue  | Tres contenedores Docker (frontend, API y base de datos) en un VPS con Ubuntu gestionado con Coolify |

Comparamos cada pieza con alternativas. Next.js le ganó a Angular y Vue porque el renderizado en el servidor carga rápido en celulares de gama baja. NestJS le ganó a Django y Rails por su estructura modular y porque nos permitía usar TypeScript en ambos lados. PostgreSQL le ganó a MySQL y MongoDB por sus transacciones ACID completas sobre un esquema que no esperábamos cambiar mucho.

```
Celular o navegador ──HTTPS──▶ Next.js (SSR) ──▶ API REST NestJS ──▶ PostgreSQL
                    (tres contenedores Docker en un VPS, desplegados con Coolify)
```

## Funcionalidades

### Guías interactivas

El contenido se organiza en guías, módulos y bloques. Un bloque puede ser texto, un video, una imagen, una pregunta, un quiz o un ejercicio interactivo. Las preguntas pueden ser de selección múltiple, falso o verdadero, abiertas, de emparejar o de ordenar, y los ejercicios interactivos incluyen arrastrar y soltar, clasificar, completar espacios y simulaciones. Los bloques y los módulos otorgan puntos, y la plataforma registra el avance de cada usuario. Escribimos 4 guías con 8 módulos y 33 bloques, 24 de ellos con preguntas de verificación.

### Calculadora hídrica

La calculadora estima cuánta agua lluvia podría recoger una vivienda con `Volumen = Lluvia × Área × Eficiencia del techo × Eficiencia del sistema`. La lluvia depende de la zona del usuario, la eficiencia del techo depende del material de la cubierta y la del sistema descuenta las pérdidas. También estima la disponibilidad, el ahorro y el CO₂. Por ejemplo, una vivienda en el sur de la ciudad (unos 1.600 mm de lluvia al año) con 50 m² de techo verde y un sistema básico podría recoger cerca de 24.000 litros al año. Es una estimación de un escenario, no una medición del agua recolectada.

### Mapa de zonas de pluviosidad

Un mapa hecho con Mapbox muestra las zonas de la ciudad, agrupadas por región y ciudad. Cada zona tiene su lluvia promedio, altitud, temperatura promedio, tipo de suelo y recomendaciones para recolectar agua allí.

### Gamificación

Los usuarios ganan puntos de experiencia al completar bloques y módulos, suben de nivel, desbloquean insignias al superar un umbral y aceptan retos. Los retos son educativos, prácticos o comunitarios, y cada uno tiene una dificultad fácil, media o difícil.

### Panel de administración

Los administradores y moderadores gestionan usuarios, guías, módulos y bloques, ciudades, regiones y zonas, y retos, niveles e insignias desde el mismo panel.

### Cuentas

El registro incluye confirmación por correo, y los usuarios pueden restablecer su contraseña por correo.

## Pensada para los celulares que la gente tiene

La encuesta definió la interfaz. Como la mayoría se conecta por celular, el diseño es mobile-first y funciona desde 320 px de ancho. Para los celulares de gama baja y media, las páginas se renderizan en el servidor y son livianas, con la meta de cargar en menos de 3 segundos en 4G. Y como el 40% de los encuestados tenía como máximo la secundaria, el lenguaje es claro y las funciones principales están a un toque desde el inicio.

## Pruebas y validación

Documentamos 113 pruebas según IEEE 829: 95 funcionales, 13 no funcionales y 5 unitarias con Jest, además de pruebas de la API en Postman. Todas pasaron después de corregir los problemas que encontraron, como un botón de cerrar sesión poco visible y notificaciones de registro que faltaban. Evaluamos la calidad con el modelo ISO/IEC 25010.

Después la probamos con personas:

- 15 participantes usaron Useberry para iniciar sesión, completar una guía, usar la calculadora, explorar el mapa y revisar su perfil. Los 15 terminaron. El 87% estuvo totalmente de acuerdo en que las guías y el mapa eran fáciles de usar, el 80% en el caso de la calculadora y el 100% en el del perfil.
- 10 estudiantes de primer semestre de Ingeniería y un docente completaron 8 tareas en una sesión exploratoria y calificaron cada dimensión entre 6,5 y 7,0 sobre 7.

Estos resultados muestran que la plataforma funciona y es fácil de usar. No demuestran que los hogares ahorraran agua ni que mantuvieran el hábito; para eso haría falta un estudio más largo.

## Próximos pasos

Vienen del trabajo futuro de la tesis:

- [ ] Un estudio longitudinal sobre si los hogares adoptan las prácticas
- [ ] Sensores IoT que reporten el nivel de agua de cada tanque
- [ ] Una auditoría de accesibilidad WCAG 2.1
- [ ] Ampliarla al resto del área metropolitana
