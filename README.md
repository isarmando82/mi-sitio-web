# Mi Sitio Web Personal

Sitio web personal construido con **HTML5 semántico** y estilizado con **CSS**
(paleta de colores, tipografías de Google Fonts y jerarquía visual). Proyecto del
curso de desarrollo web.

La maquetación es **mobile-first**: el diseño base funciona en celular con las
secciones apiladas y la complejidad se suma con media queries de `min-width`,
usando **CSS Grid** para el layout maestro y **Flexbox** para los componentes.

## Estructura del proyecto

```
mi-sitio-web/
├── index.html          # Página de inicio (con <h1>)
├── pages/
│   ├── sobre-mi.html   # Biografía y trayectoria
│   ├── servicios.html  # Servicios y habilidades
│   ├── proyectos.html  # Proyectos
│   └── contacto.html   # Medios de contacto
├── styles/
│   └── styles.css      # Hoja de estilos externa
├── img/                # Imágenes representativas (.svg)
└── README.md
```

## Características

- Documento válido: `<!DOCTYPE html>`, `<html lang="es">`, `<head>` y `<body>`.
- Etiquetas semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`.
- Hoja de estilos externa vinculada con `<link>` en los 5 archivos (sin estilos en línea).
- Estilos aplicados solo con **clases** (sin IDs y sin `!important`).
- Paleta de 3 colores en HEX: primario `#1f3a5f`, secundario `#4a7fb5`, acento `#f2a900`.
- Tipografías de Google Fonts: **Poppins** (títulos) y **Open Sans** (cuerpo), con fallback `sans-serif`.
- Jerarquía visual clara y diseño adaptable a móviles.

## Maquetación con CSS Grid y responsividad

- **Mobile-first**: el diseño base (sin media queries) es de una sola columna;
  las secciones se apilan al 100% del ancho. No se usa ningún `max-width` en
  media queries.
- **Grid container**: el `<main>` de `index.html` y de `pages/proyectos.html`
  usa `display: grid`.
- **Áreas nombradas**: el layout se define con `grid-template-areas`
  (`hero`, `bio`, `skills`, `figura` en inicio; `intro`, `proyectos`, `figura`
  en proyectos) y cada bloque se ubica con `grid-area`.
- **Diseño fluido**: las columnas se definen con la unidad `fr`
  (`1fr`, `1fr 1fr`, `2fr 1fr`, `repeat(3, 1fr)`), nunca con anchos fijos en px.
- **Escalera responsiva** con dos breakpoints de `min-width`:

| Ancho | Inicio | Proyectos |
|---|---|---|
| base (celular) | 1 columna, todo apilado | 1 columna, tarjetas apiladas |
| `min-width: 768px` | 2 columnas: habilidades y figura lado a lado | tarjetas en 2 columnas |
| `min-width: 1024px` | hero completo, biografía + habilidades (`2fr 1fr`), figura completa | intro y figura arriba, tarjetas en 3 columnas |

- **Espaciado**: siempre con `gap`, tanto en los grid como en los flex containers.
- **Progreso en el resto de las páginas**: `sobre-mi.html`, `servicios.html` y
  `contacto.html` también incorporan grids de dos columnas a partir de 768px.

## Cómo verlo

Abrí `index.html` en tu navegador y navegá con el menú superior.
