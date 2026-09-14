// Fuente única de verdad de la identidad del sitio.
// Cambia aquí nombre, contacto y navegación: los componentes lo derivan.

export const SITE_AUTHOR = 'Estephany Mago';
export const SITE_TITLE = 'Estephany Mago';
export const SITE_ROLE = 'Product Designer UX/UI';

export const SITE_TAGLINE =
  'Diseño soluciones SaaS accesibles y centradas en el usuario.';

export const SITE_DESCRIPTION =
  'Portfolio de Estephany Mago, Product Designer UX/UI en Valencia. Sistemas de diseño, accesibilidad y producto SaaS contados como case studies.';

export const EMAIL = 'Tefymago@gmail.com';
export const UBICACION = 'Valencia, España';

export const LINKEDIN = 'https://www.linkedin.com/in/estephanymago';

// El archivo vive en public/ con este nombre exacto.
export const CV_PATH = '/cv-estephany-mago.pdf';

// El móvil del CV NO está publicado a propósito: en una web indexada es un imán
// de spam. Si lo quieres visible, añádelo aquí y píntalo en /contacto.

// Ponlo a false cuando ya no busques activamente: oculta el badge del hero.
export const BUSCANDO_TRABAJO = true;
export const DISPONIBILIDAD = 'Disponible para nuevas oportunidades';

// Barra final obligatoria: trailingSlash es 'always' en astro.config.mjs.
export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos/', label: 'Proyectos' },
  { href: '/sobre-mi/', label: 'Sobre mí' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const SOCIALS = [
  { href: `mailto:${EMAIL}`, label: 'Email', externo: false },
  { href: LINKEDIN, label: 'LinkedIn', externo: true },
  { href: CV_PATH, label: 'CV (PDF)', externo: false },
] as const;
