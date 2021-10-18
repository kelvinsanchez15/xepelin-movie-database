# Xepelin Movie Database

## Demo

[xepelin-movie-database.vercel.app](https://xepelin-movie-database.vercel.app/)

## Descripción del proyecto

Catálogo de películas que utiliza la [API de The Movie DB (TMDB)](https://www.themoviedb.org/documentation/api) como fuente de información y la [API de pruebas de Zepelin](https://github.com/xepelinapp/xepelin-test-front-api) para el manejo del flujo de autenticación.

## Capturas

![Multidevices mockup](https://user-images.githubusercontent.com/4708484/137650774-c125bd8a-eb7d-4ec8-b175-73f52a74bdfc.png)

## Notas de configuración

Para desarrollo local: `npm run dev`

Al ejecutar la [API de pruebas de Zepelin](https://github.com/xepelinapp/xepelin-test-front-api), se debe configurar el puerto del servidor a `4000` en vez de `3000`.

## Estructura del proyecto

```bash
|-root
  |-pages # Páginas
    |-_app.jsx
    |-_document.jsx
    |-index.jsx # Home
    |-signin.jsx # Inicio de sesión
    |-signup.jsx # Registro
  |-public
  |-src
    |-api # Funciones para interactuar con API de TMDB
    |-app # Lógica de Redux
      |-services
        |-auth.js
      |-store.js
    |-components
      |-layout
      |-Hero.jsx
      |-Link.jsx
      |-MoviesCard.jsx
      |-MoviesCarousel.jsx
    |-hooks
    |-styles
      |-theme.js # Tema personalizado de Material UI
    |-utils
```

La aplicación utiliza Incremental Static Regeneration (ISR) de Next.js para regenerar la página en segundo plano, actualizando la información de la misma, mientras se mantiene un rendimiento óptimo.

Las siguientes [funciones](src/api/index.js) se utilizan para interacturar con la [API de The Movie DB (TMDB)](https://www.themoviedb.org/documentation/api):

- `getPopularMovies` - Obtener peliculas más populares
- `getTopRatedMovies` - Obtener peliculas mejor evaluadas
- `getUpcomingMovies` - Obtener próximos eventos
- `getLatestMovies` - Obtener últimos lanzamientos
- `getMovieDetailsById` - Obtener detalles de película
- `getFavoritesMoviesWithDetails` - Obtener peliculas favoritas

El flujo de autenticación se maneja con [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), una herramienta muy útil para la descarga de datos y el cacheo de los mismos.

## TODOs (Por hacer)

Debido al tiempo limitado para la realización de la prueba, algunas funcionalidades y requerimientos quedaron pendientes:

- [ ] Botón de cerrar diálogo
- [ ] Añadir/Quitar pelicula favorita
- [ ] Suite de pruebas
- [ ] Usar storybook para documentar componentes

## Dependencias principales

- [React](https://reactjs.org/) - Una librería de Javascript para crear interfaces de usuario.
- [NextJS](https://nextjs.org/) - Un framework de React con renderizado híbrido estático y en el servidor.
- [Material UI](https://material-ui.com/) - Un sistema de diseño basado en componentes de React.
- [Redux](https://redux.js.org/) - Un contenedor de estado predecible para JS Apps.
- [react-multi-carousel](hhttps://github.com/YIZHUANG/react-multi-carousel) - Un componente de carrusel de React personalizable que soporta múltiples elementos y SSR.
