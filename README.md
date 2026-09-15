# Mi Sitio Web Personal

🔗 **Sitio publicado:** https://isarmando82.github.io/mi-sitio-web/
📦 **Repositorio:** https://github.com/isarmando82/mi-sitio-web

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
├── .gitignore          # Archivos que Git ignora
└── README.md
```

`index.html` vive en la **raíz** del repositorio (requisito de GitHub Pages) y
**todas las rutas son relativas**: desde la raíz se apunta como
`styles/styles.css`, `img/logo.svg` y `pages/servicios.html`; desde `pages/` se
sube un nivel con `../styles/styles.css`, `../img/logo.svg` y `../index.html`.
No hay ninguna ruta absoluta ni ruta de disco local, así que el sitio funciona
igual clonado en cualquier máquina que servido desde GitHub Pages.

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
  (`hero`, `bio`, `skills`, `galeria`, `figura` en inicio; `intro`, `proyectos`,
  `figura` en proyectos) y cada bloque se ubica con `grid-area`.
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

## Integración de Bootstrap y estados interactivos

Bootstrap 5.3.3 se integra **por CDN** en los 5 archivos HTML: el CSS en el
`<head>` (siempre **antes** de `styles/styles.css`, para que la hoja propia
tenga la última palabra) y el JS `bootstrap.bundle.min.js` **antes de cerrar
el `</body>`**.

### Navbar responsivo

Los 5 archivos usan la misma `navbar navbar-expand-lg`: en escritorio los
enlaces se ven en línea y por debajo de **992px (breakpoint `lg`)** colapsan en
el **menú hamburguesa** (`navbar-toggler` + `collapse navbar-collapse`).

### Componentes por página

| Archivo | Componentes de Bootstrap |
|---|---|
| `index.html` | Navbar · **Carousel** (galería de 3 imágenes con indicadores y controles) · **Accordion** de habilidades · Botones `.btn` |
| `pages/proyectos.html` | Navbar · **Carousel** · **Cards** con el **grid system** (`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4`) · **Badges** · **Modales** de detalle |
| `pages/sobre-mi.html` | Navbar · **List group** · Botón |
| `pages/servicios.html` | Navbar · **List group** · **Badges** · Botones |
| `pages/contacto.html` | Navbar · **Alert** · **Formulario** (`form-control`, `form-label`) · Botón |

### Estilos propios sobre el framework

Ningún componente queda con la estética por defecto de Bootstrap: la sección 12
de `styles.css` repinta navbar, carousel, accordion, cards, badges, modales,
list-group, alert y formulario con la paleta del sitio (azul `#1f3a5f`,
azul medio `#4a7fb5` y dorado `#f2a900`) y las tipografías Poppins / Open Sans.
Incluso el ícono de la hamburguesa y la flecha del accordion se redibujan en
dorado.

### Estados interactivos con pseudoclases

La sección 13 de `styles.css` aplica `:hover`, `:focus` y `:active` a **todos
los elementos clicables** del sitio —enlaces del navbar, marca, botón
hamburguesa, botones, controles e indicadores del carousel, accordion, tarjetas,
ítems del list-group, campos del formulario y enlaces del pie—, siempre
acompañados de `transition` para que el cambio sea suave. Como viven en la hoja
de estilos compartida, se ven en los 5 archivos HTML. Además se usa
`:focus-visible` para que quien navega con el teclado vea siempre dónde está
parado.

## Control de versiones con Git y GitHub

Todo el proyecto se versiona con Git y se publica en un **repositorio público**:
https://github.com/isarmando82/mi-sitio-web

### Configuración del repositorio remoto

El repositorio local se conectó al remoto y se publicó en la rama `main`:

```bash
git init
git add .
git commit -m "chore: estructura inicial del sitio"
git branch -M main
git remote add origin https://github.com/isarmando82/mi-sitio-web.git
git push -u origin main
```

A partir de ahí, cada avance del proyecto se sube desde la consola con el ciclo
`git add` → `git commit -m "..."` → `git push`, y con `git status`, `git log` y
`git diff` se revisa el estado antes de confirmar.

### Convención de mensajes de commit

Los mensajes siguen el formato `tipo: descripción` en imperativo y en una sola
línea, para que el historial se lea como una lista de avances:

| Tipo | Se usa para |
|---|---|
| `feat` | Una funcionalidad o sección nueva |
| `fix` | La corrección de un error |
| `style` | Cambios visuales o de CSS que no alteran la funcionalidad |
| `docs` | Documentación (este README) |
| `chore` | Tareas de mantenimiento del repositorio (`.gitignore`, configuración) |

### Archivos ignorados

El `.gitignore` deja fuera del repositorio lo que no forma parte del código:
archivos del sistema operativo (`Thumbs.db`, `.DS_Store`), carpetas de editores
(`.vscode/`, `.idea/`), temporales y respaldos (`*.tmp`, `*.bak`, `*.log`) y los
comprimidos de entrega (`*.zip`).

### Ramas

`main` es la rama de trabajo y la que publica el sitio. En el repositorio quedan
además las ramas históricas `entrega-2`, `entrega-3` y `entrega-4`, que
conservan el estado del proyecto en cada módulo.

### Publicación con GitHub Pages

El sitio se despliega desde la rama `main`, carpeta raíz (`/root`), en
**Settings → Pages**. Cada `push` a `main` vuelve a publicar automáticamente:

👉 https://isarmando82.github.io/mi-sitio-web/

## Cómo verlo

- **En línea:** https://isarmando82.github.io/mi-sitio-web/
- **En local:** cloná el repositorio y abrí `index.html` en el navegador.

```bash
git clone https://github.com/isarmando82/mi-sitio-web.git
```

Para ver el menú hamburguesa, achicá la ventana por debajo de los 992px.

## Entregas del curso

| Entrega | Tema | Documentado en |
|---|---|---|
| 1 | Estructura base con HTML5 semántico | Estructura del proyecto |
| 2 | Estilización visual, paleta y tipografías | Características |
| 3 | Layouts flexibles con Flexbox | Características |
| 4 | Maquetación con CSS Grid y media queries | Maquetación con CSS Grid y responsividad |
| 5 | Integración de Bootstrap y pseudoclases | Integración de Bootstrap y estados interactivos |
| 6 | Estructura avanzada y control de versiones | Control de versiones con Git y GitHub |

---

Proyecto del curso **Desarrollo Web** de Coderhouse — Ismael Armando.
