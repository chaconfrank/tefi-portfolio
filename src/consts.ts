// Fuente única de verdad de la identidad del sitio.
// Cambia aquí nombre, contacto y navegación: los componentes lo derivan.

export const SITE_AUTHOR = 'Estephany Mago';
export const SITE_TITLE = 'Estephany Mago';
export const SITE_ROLE = 'Product Designer UX/UI';

export const SITE_DESCRIPTION =
  'Portfolio de Estephany Mago, Product Designer UX/UI en Valencia. Sistemas de diseño, accesibilidad y producto SaaS contados como case studies.';

export const EMAIL = 'Tefymago@gmail.com';

export const LINKEDIN = 'https://www.linkedin.com/in/estephanymago';

// El archivo vive en public/ con este nombre exacto.
export const CV_PATH = '/cv-estephany-mago.pdf';
// Versión en inglés: la enlazan las páginas de /en/ (ver cvPath en i18n.ts).
export const CV_PATH_EN = '/cv-estephany-mago-en.pdf';

// El móvil no se pinta en ninguna página: en HTML indexado es un imán de spam.
// Sí viaja dentro del CV en PDF, y es deliberado — descargarlo es un acto
// consciente. Si lo quieres visible en la web, añádelo aquí y píntalo en /contacto.

// Ponlo a false cuando ya no busques activamente: oculta el badge del hero,
// el de /contacto y el sello giratorio del cierre.
export const BUSCANDO_TRABAJO = true;

// Texto del sello giratorio (AvailabilityBadge). Va en inglés a propósito:
// es un elemento gráfico, no copy que haya que leer para entender la página.
export const DISPONIBILIDAD_SELLO = "I'm available for full time work";

// Trayectoria. Son dos cifras distintas y las dos son ciertas: 9 años en el
// sector del diseño (desde 2017) y 2 diseñando producto. La primera da
// criterio, la segunda acota la especialidad. Revisa el año cuando cambie.
export const ANIOS_DISENO = 9;
export const ANIOS_PRODUCTO = 2;

// Navegación, textos de interfaz (lema, disponibilidad, ubicación…) y rutas
// en los dos idiomas: src/i18n.ts.
