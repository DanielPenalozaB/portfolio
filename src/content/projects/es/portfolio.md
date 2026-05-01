---
title: "Portafolio"
description: "Portafolio personal diseñado en Figma y construido con Astro, con animaciones orbitales, soporte i18n, modo oscuro, grilla de puntos interactiva y transiciones con GSAP."
image: "/images/projects/portfolio/front.png"
tags: ["Astro", "TailwindCSS", "GSAP", "Figma"]
repo: "https://github.com/danielpenalozab/portfolio"
url: "/es/projects/portfolio"
---

## Resumen

Este portafolio es mi hogar digital — un espacio para mostrar no solo lo que construyo, sino _cómo_ lo construyo. Cada interacción, animación y decisión de diseño fue intencional, diseñada desde cero en Figma y llevada a la vida con la arquitectura de islas de Astro.

> Un portafolio debe practicar lo que predica. Si dices que te importa el rendimiento y el diseño, tu propio sitio debe demostrarlo.

---

## El Problema

La mayoría de portafolios de desarrolladores caen en dos campos: o son SPAs de React sobre-ingeniadas que tardan segundos en cargar, o son plantillas estáticas sin personalidad. Quería algo intermedio — **ultra rápido**, visualmente distintivo y técnicamente interesante sin sacrificar accesibilidad ni rendimiento.

---

## Diseño

Todo comenzó en Figma — desde la grilla de layout y la paleta de colores hasta el concepto de animación orbital y el desglose de componentes. Tener un sistema de diseño completo antes de escribir código mantuvo el desarrollo enfocado y rápido.

![Archivos de diseño en Figma del portafolio](/images/projects/portfolio/portfolio-figma-design.png)

---

## Objetivos

- Diseñar una identidad visual única desde cero en Figma
- Lograr puntuaciones casi perfectas en Lighthouse en todas las categorías
- Soportar internacionalización completa (Inglés/Español)
- Implementar animaciones fluidas y performantes que respeten `prefers-reduced-motion`
- Construir con un stack moderno que mantenga el bundle mínimo
- Asegurar cumplimiento total de accesibilidad (WCAG 2.1 AA)

---

## Stack Tecnológico

| Tecnología         | Rol                                                             |
| ------------------ | --------------------------------------------------------------- |
| **Astro**          | Framework de sitio estático con arquitectura de islas           |
| **TailwindCSS v4** | Estilos utility-first con variante personalizada de modo oscuro |
| **GSAP**           | Animaciones imperativas para movimiento orbital y reveals       |
| **React**          | Islas interactivas (DotGrid canvas, efectos WebGL)              |
| **TypeScript**     | Seguridad de tipos en componentes y sistema i18n                |
| **Figma**          | Sistema de diseño completo y prototipado                        |

---

## Arquitectura

El sitio sigue el enfoque orientado a contenido de Astro con una capa i18n personalizada:

```
src/
├── components/     # Islas interactivas Astro + React
├── content/        # Colecciones Markdown (blog, proyectos)
├── i18n/           # Sistema de traducción con tipos seguros
│   ├── locales/    # en.ts, es.ts
│   └── index.ts    # getLocaleFromUrl, useTranslations
├── layouts/        # Layout, BlogPost, ProjectDetail
├── pages/          # Rutas basadas en archivos con prefijos de locale
└── styles/         # CSS global con directivas de Tailwind
```

El sistema i18n usa **claves de traducción tipadas** derivadas del locale en inglés, asegurando seguridad en tiempo de compilación al agregar o usar traducciones. Las colecciones de contenido soportan IDs con prefijo de locale (`en/portfolio`, `es/portfolio`) para contenido bilingüe sin fricciones.

---

## Características Principales

### Animación Orbital de Habilidades

La sección hero presenta habilidades orbitando en anillos concéntricos, animadas con GSAP. Cada órbita tiene su propia velocidad y dirección, creando una visualización viva de mi stack tecnológico.

### Grilla de Puntos Interactiva

Un canvas potenciado por React renderiza miles de puntos que reaccionan a la proximidad del cursor con resistencia configurable. El componente usa `requestAnimationFrame` con un `IntersectionObserver` para pausar cuando está fuera de pantalla, asegurando cero ciclos desperdiciados.

### Modo Oscuro con Prevención de FOUC

Modo oscuro basado en clases con un script inline síncrono que lee `localStorage` antes del primer render, previniendo cualquier flash de contenido sin estilos. Un `MutationObserver` conecta el estado del tema con las islas de React.

### Animaciones de Revelado

Animaciones de revelado activadas por scroll usando `IntersectionObserver` con delays escalonados. Los elementos aparecen con fade y traducción a medida que el usuario hace scroll, con degradación elegante para usuarios que prefieren movimiento reducido.

---

## Desafíos y Soluciones

### Desafío: Reactividad del Tema en Islas React

La arquitectura de islas de Astro significa que los componentes React se hidratan independientemente. Cuando el usuario cambia el modo oscuro desde el header de Astro, las islas React no tenían forma de saberlo.

**Solución:** Un `MutationObserver` observa la lista de clases del elemento `<html>` buscando cambios de `dark`, actualizando el estado de React para disparar re-renders con los colores correctos del tema.

### Desafío: i18n Sin Framework

En lugar de integrar una librería i18n pesada, construí un sistema ligero con tipos. El desafío fue mantener las traducciones type-safe mientras se soportaba resolución dinámica de locale desde URLs.

**Solución:** El locale `en.ts` sirve como fuente de verdad para los tipos `TranslationKey`. Una función `useTranslations(locale)` retorna un helper `t()` tipado, y `getLocalizedPath()` maneja el cambio de locale en URLs.

### Desafío: Rendimiento con Animaciones Pesadas

Las animaciones orbitales de GSAP y el renderizado de canvas pueden exigir mucho a dispositivos de gama baja. El sitio necesitaba lucir impresionante sin ser inutilizable.

**Solución:** Las media queries `prefers-reduced-motion` deshabilitan las animaciones completamente para usuarios que lo eligen. Las animaciones del canvas pausan vía `IntersectionObserver` cuando se hace scroll fuera de vista. El resultado: 60fps en hardware moderno, degradación elegante en el resto.

---

## Rendimiento

| Métrica           | Puntuación |
| ----------------- | ---------- |
| Performance       | 98         |
| Accesibilidad     | 100        |
| Mejores Prácticas | 100        |
| SEO               | 100        |

---

## Lecciones Aprendidas

1. **Diseñar primero, codear después** — Tener un diseño completo en Figma antes de escribir código eliminó la parálisis de decisión durante el desarrollo.
2. **La arquitectura de islas es poderosa** — El enfoque de Astro de no enviar JS por defecto e hidratar solo componentes interactivos mantiene el bundle diminuto.
3. **La accesibilidad es una feature, no un extra** — Construir con a11y en mente desde el día uno (skip links, etiquetas ARIA, navegación por teclado) es mucho más fácil que retrofitear.
4. **i18n simple puede ser type-safe** — No necesitas un framework pesado para obtener seguridad de claves de traducción en tiempo de compilación.

---

## Próximos Pasos

- [ ] Agregar narrativas de caso de estudio con media enriquecida
- [ ] Implementar view transitions entre páginas
- [ ] Agregar formulario de contacto con backend serverless
- [ ] Integrar analíticas con herramientas que respeten la privacidad
- [ ] Crear un feed RSS para los posts del blog
