# Mi Sitio Web Personal

Estructura base (esqueleto semántico) de un sitio web personal, hecho con **HTML5**
sin estilos visuales. Trabajo práctico del módulo de estructura HTML.

## Estructura del proyecto

```
mi-sitio-web/
├── index.html          # Página de inicio (con <h1>)
├── pages/
│   ├── sobre-mi.html   # Biografía y habilidades (con <article>)
│   ├── proyectos.html  # Proyectos (con <article>)
│   └── contacto.html   # Medios de contacto (con <article>)
├── img/                # Imágenes representativas (.svg)
└── README.md
```

## Características

- Documento válido: `<!DOCTYPE html>`, `<html lang="es">`, `<head>` y `<body>`.
- Etiquetas semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`.
- `index.html` es directamente la página de inicio: sin duplicación ni idas y vueltas.
- Jerarquía de encabezados sin saltos (`h1` → `h2` → `h3`).
- Todas las imágenes con atributo `alt` descriptivo, dentro de `<figure>` con `<figcaption>`.
- Validado sin errores con el [Validador W3C](https://validator.w3.org/).

## Cómo verlo

Abrí `index.html` en tu navegador y navegá con el menú superior.
