---
title: "Portafolio"
description: "Portafolio personal diseñado en Figma y construido con Astro, con animaciones orbitales, soporte i18n, modo oscuro, grilla de puntos interactiva y transiciones con GSAP."
image: "/images/projects/portfolio/front.png"
tags: ["Astro", "TailwindCSS", "GSAP", "Figma"]
order: 1
repo: "https://github.com/danielpenalozab/portfolio"
url: "/es/projects/portfolio"
---

## Resumen

Este portafolio muestra lo que construyo y cómo lo construyo. Lo diseñé desde cero en Figma y lo desarrollé con la arquitectura de islas de Astro. Si un sitio dice que le importan el rendimiento y el diseño, debería demostrarlo, así que le puse esa misma exigencia a este.

## El problema

La mayoría de los portafolios de desarrolladores caen en uno de dos grupos: aplicaciones de una sola página en React que tardan segundos en cargar, o plantillas estáticas sin personalidad. Yo quería algo intermedio: muy rápido y con identidad visual propia, interesante de construir y sin sacrificar la accesibilidad ni el rendimiento.

## Diseño

Todo empezó en Figma, desde la retícula y la paleta de colores hasta la animación orbital y la división de la página en componentes. Tener el sistema de diseño completo antes de escribir código mantuvo el desarrollo enfocado y rápido.

![Archivos de diseño en Figma del portafolio](/images/projects/portfolio/portfolio-figma-design.webp)

## Objetivos

- Diseñar una identidad visual desde cero en Figma
- Llegar a puntuaciones casi perfectas en Lighthouse en todas las categorías
- Soportar inglés y español en todo el sitio
- Mantener las animaciones fluidas y respetar `prefers-reduced-motion`
- Mantener pequeño el bundle de JavaScript
- Cumplir con la accesibilidad WCAG 2.1 AA

## Stack tecnológico

| Tecnología         | Rol                                                             |
| ------------------ | --------------------------------------------------------------- |
| **Astro**          | Framework de sitio estático con arquitectura de islas           |
| **TailwindCSS v4** | Estilos utility-first con variante personalizada de modo oscuro |
| **GSAP**           | Animaciones imperativas para movimiento orbital y reveals       |
| **React**          | Islas interactivas (DotGrid canvas, efectos WebGL)              |
| **TypeScript**     | Seguridad de tipos en componentes y sistema i18n                |
| **Figma**          | Sistema de diseño completo y prototipado                        |
| **Docker + Nginx** | Imagen de producción con cabeceras de seguridad y caché         |
| **Coolify**        | Despliegue en mi propio servidor                                |
| **GitHub Actions** | Verificación de tipos y build de producción en cada PR          |

## Arquitectura

El sitio sigue la estructura orientada a contenido de Astro, con una capa de i18n propia encima:

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

Las claves de traducción toman su tipo del idioma inglés, así que usar una clave que no existe falla en tiempo de compilación. Las colecciones de contenido usan IDs con prefijo de idioma (`en/portfolio`, `es/portfolio`), lo que mantiene ambos idiomas uno al lado del otro.

## Funcionalidades

### Animación orbital de habilidades

La sección principal muestra mis habilidades orbitando en anillos concéntricos, animadas con GSAP. Cada anillo tiene su propia velocidad y dirección.

### Cuadrícula de puntos interactiva

Un canvas en React dibuja miles de puntos que reaccionan cuando el cursor se acerca. Funciona con `requestAnimationFrame` y usa un `IntersectionObserver` para pausarse cuando no está en pantalla, así no gasta ciclos en algo que nadie ve.

### Modo oscuro sin parpadeo

El modo oscuro funciona con clases. Un pequeño script inline lee `localStorage` antes del primer pintado, así la página nunca muestra el tema equivocado por un instante, y un `MutationObserver` les pasa los cambios de tema a las islas de React.

### Animaciones al hacer scroll

Las secciones aparecen con un desvanecimiento y un desplazamiento al hacer scroll, usando un `IntersectionObserver` con retrasos escalonados. Si prefieres movimiento reducido, el contenido simplemente aparece.

## Problemas que tuve que resolver

### Cambios de tema en las islas de React

En Astro, las islas de React se hidratan de forma independiente, así que cuando alguien cambiaba al modo oscuro desde el encabezado de Astro, las islas no se enteraban. Ahora un `MutationObserver` vigila la clase `dark` en `<html>` y actualiza el estado de React, que vuelve a renderizar las islas con los colores correctos.

### i18n sin una librería

No quería agregar una librería pesada de i18n, así que escribí un sistema tipado pequeño. Lo difícil fue mantener las traducciones con tipos seguros mientras el idioma se lee desde la URL. El archivo `en.ts` define el tipo `TranslationKey`, `useTranslations(locale)` devuelve una función `t()` tipada y `getLocalizedPath()` arma el enlace al otro idioma.

### Animaciones pesadas en dispositivos lentos

Las órbitas de GSAP y el canvas pueden exigir demasiado a los dispositivos de gama baja, y el sitio tenía que seguir siendo usable en ellos. Con `prefers-reduced-motion` activado, las animaciones se desactivan por completo, y el canvas se pausa mediante un `IntersectionObserver` cuando sale de la vista. En hardware moderno corre a 60fps.

### Fuentes que nunca cargaban

Durante meses el sitio se mostró con fuentes de respaldo sin que me diera cuenta. Las reglas `@font-face` declaraban `font-family: "DM Sans", sans-serif`, pero ese descriptor solo acepta un nombre, así que los navegadores descartaban la regla completa. Lo confirmé en Chrome sin interfaz, corregí ambas fuentes y le di a la fuente variable su rango de pesos, para que el texto en negrita y el liviano usen la fuente real en lugar de una sintetizada.

### Actualizar Astro sin cambiar el sitio

Pasar de Astro 5 a 7 implicaba saltar dos versiones mayores, y Astro 7 elimina por defecto los espacios entre elementos, lo que puede pegar palabras sin que nadie lo note. Para detectarlo, construí la versión vieja y la nueva lado a lado y comparé el texto que un navegador real muestra en las 16 páginas, en anchos de escritorio y de celular. La única diferencia fue un error real: el orden de la colección había cambiado y alteraba qué proyectos aparecían destacados en español. Ahora los proyectos tienen un campo `order` explícito.

## Cómo se publica

El sitio se construye en una imagen Docker de varias etapas que sirve Nginx y se despliega con Coolify. Nginx envía cabeceras de seguridad en cada respuesta (`nosniff`, una política de referer, bloqueo de iframes, una política de permisos y una política de seguridad de contenido mínima), guarda en caché por un año los archivos con hash y obliga a revalidar el HTML en cada visita, así los despliegues se ven de inmediato. Cada pull request ejecuta la verificación de tipos y un build de producción en GitHub Actions.

## Rendimiento

PageSpeed Insights en la página de inicio, 2 de noviembre de 2026:

| Métrica                | Móvil | Escritorio |
| ---------------------- | ----- | ---------- |
| Rendimiento            | 100   | 100        |
| Accesibilidad          | 100   | 100        |
| Prácticas recomendadas | 100   | 100        |
| SEO                    | 100   | 100        |

## Lo que aprendí

1. Terminar el diseño en Figma antes de escribir código hizo que no tuviera que tomar decisiones de diseño a mitad de un componente.
2. Las islas mantienen pequeño el bundle: Astro no envía JavaScript por defecto e hidrata solo las partes interactivas.
3. Incluir la accesibilidad desde el primer día (enlaces para saltar al contenido, etiquetas ARIA, navegación con teclado) es mucho más fácil que agregarla después.
4. Un sistema de i18n pequeño puede tener tipos seguros sin un framework grande.

## Próximos pasos

- [ ] Agregar un formulario de contacto con una función serverless
- [ ] Agregar analítica con herramientas que respeten la privacidad
