# Mi Sitio Web Personal

🔗 **Sitio publicado:** https://isarmando82.github.io/mi-sitio-web/
📦 **Repositorio:** https://github.com/isarmando82/mi-sitio-web

Sitio web personal construido con **HTML5 semántico** y estilizado con **SCSS**
(arquitectura de partials, variables y mixins), compilado a una única hoja
`styles/style.css`. Proyecto del curso de desarrollo web.

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
├── scss/               # Código fuente de los estilos (ver más abajo)
├── styles/
│   └── style.css       # CSS compilado — no se edita a mano
├── img/                # Imágenes representativas (.svg)
├── package.json        # Script de compilación de Sass
├── .gitignore          # Archivos que Git ignora
└── README.md
```

`index.html` vive en la **raíz** del repositorio (requisito de GitHub Pages) y
**todas las rutas son relativas**: desde la raíz se apunta como
`styles/style.css`, `img/logo.svg` y `pages/servicios.html`; desde `pages/` se
sube un nivel con `../styles/style.css`, `../img/logo.svg` y `../index.html`.
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

## Arquitectura SCSS

Todo el diseño nace de archivos `.scss`. **No se edita CSS a mano**:
`styles/style.css` es solo el resultado de la compilación.

```
scss/
├── main.scss                   # único punto de entrada (solo @use, sin reglas)
├── utilities/
│   ├── _variables.scss         # paleta, tipografías, espaciados, radios,
│   │                           #   sombras, tiempos y breakpoints
│   └── _mixins.scss            # desde(), transicion(), columna(),
│                               #   grilla-fluida(), superficie(), titulo(),
│                               #   foco-teclado() y la función color-url()
├── base/
│   ├── _base.scss              # reset global y cuerpo de página
│   └── _tipografia.scss        # títulos, textos, listas y enlaces
├── layout/
│   ├── _layout.scss            # grid maestro, áreas nombradas y breakpoints
│   ├── _header.scss            # encabezado y marca
│   ├── _nav.scss               # menú, hamburguesa y panel desplegable
│   └── _footer.scss            # pie de página
└── components/
    ├── _components.scss        # insignias, figuras y aviso
    ├── _buttons.scss           # botones y sus estados
    ├── _cards.scss             # tarjetas propias y de Bootstrap
    ├── _carousel.scss          # galería
    ├── _accordion.scss         # habilidades
    ├── _modal.scss             # detalle de proyectos
    └── _forms.scss             # formulario y list-group
```

### Partials

Todos los archivos empiezan con guion bajo: son **piezas**, no hojas
independientes, y Sass no genera un `.css` por cada uno. El único archivo sin
guion bajo es `main.scss`.

### main.scss

Es el único punto de entrada y **no contiene ni una regla de estilo**: solo
llama a los partials con `@use`, en el orden en el que deben salir en la
cascada (utilidades → base → layout → componentes).

```scss
@use 'utilities/variables' as *;
@use 'utilities/mixins' as *;
@use 'base/base';
@use 'layout/layout';
@use 'components/buttons';
```

Cada partial vuelve a declarar el `@use` de lo que necesita: en Sass moderno
los módulos no se heredan, así que un partial que usa una variable la importa
él mismo.

### Variables y cero valores sueltos

Ningún partial escribe un color, un radio, una sombra o un breakpoint a mano:
todo sale de `utilities/_variables.scss`.

```scss
$color-primario: #1f3a5f;
$color-acento: #f2a900;
$radio-medio: 10px;
$sombra-suave: 0 2px 8px rgba($color-primario, 0.08);
```

Las transparencias se derivan de la paleta con `rgba($color-primario, 0.08)`
en lugar de escribir el RGB, y hasta el color de los SVG embebidos (el ícono
hamburguesa y la flecha del accordion) se arma por interpolación con la
función `color-url()`, así que tampoco ahí queda un `#f2a900` hardcodeado.

### Nesting y el operador `&`

Los estados viven junto al elemento al que pertenecen, en vez de repetirse en
una sección aparte al final de la hoja:

```scss
.btn-acento {
  background-color: $color-acento;

  &:hover,
  &:focus {
    background-color: $color-acento-oscuro;
    box-shadow: $sombra-boton;
  }

  &:active {
    transform: translateY(2px);
  }
}
```

### Mixins

El más usado es `desde()`, que centraliza los breakpoints: los anchos se
definen una sola vez en un mapa y los partials los piden por nombre.

```scss
.grilla-tarjetas {
  @include grilla-fluida($espacio-medio);

  @include desde('tablet') { grid-template-columns: repeat(2, 1fr); }
  @include desde('escritorio') { grid-template-columns: repeat(3, 1fr); }
}
```

### Compilación

```bash
npm install          # instala Sass (una sola vez)
npm run css          # compila scss/main.scss -> styles/style.css
npm run css:watch    # recompila solo al guardar
```

O directamente, sin npm:

```bash
sass scss/main.scss styles/style.css --no-source-map
```

El `style.css` compilado **se versiona** en el repositorio porque GitHub Pages
publica archivos estáticos y no compila SCSS por su cuenta.

### Equivalencia visual

La refactorización es estructural: el sitio se ve igual que antes. Se verificó
renderizando las 5 páginas a 375px, 768px y 1280px con la hoja vieja y con la
nueva, y comparando las capturas píxel por píxel: **idénticas en los 15 casos**.

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
`<head>` (siempre **antes** de `styles/style.css`, para que la hoja propia
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

Ningún componente queda con la estética por defecto de Bootstrap: los partials
de `scss/components/` repintan navbar, carousel, accordion, cards, badges, modales,
list-group, alert y formulario con la paleta del sitio (azul `#1f3a5f`,
azul medio `#4a7fb5` y dorado `#f2a900`) y las tipografías Poppins / Open Sans.
Incluso el ícono de la hamburguesa y la flecha del accordion se redibujan en
dorado.

### Estados interactivos con pseudoclases

Cada partial aplica `:hover`, `:focus` y `:active` —anidados con `&`— a **todos
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
| 7 | Arquitectura SCSS y refactorización | Arquitectura SCSS |

---

Proyecto del curso **Desarrollo Web** de Coderhouse — Ismael Armando.
