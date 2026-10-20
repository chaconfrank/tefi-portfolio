// Idiomas del sitio. El español es el idioma por defecto y vive en la raíz
// (/); el inglés, en /en/. El idioma de cada página se deduce de su URL, así
// que los componentes no necesitan recibirlo por props: basta con
// `getLang(Astro.url)`.
import { getCollection, type CollectionEntry } from 'astro:content';
import { CV_PATH, CV_PATH_EN } from './consts';

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const getLang = (url: URL): Lang => (url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'es');

// Rutas equivalentes en los dos idiomas. Barra final obligatoria
// (trailingSlash: 'always').
export const RUTAS = {
  inicio: { es: '/', en: '/en/' },
  proyectos: { es: '/proyectos/', en: '/en/projects/' },
  sobreMi: { es: '/sobre-mi/', en: '/en/about/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
} as const;

export const ruta = (lang: Lang, clave: keyof typeof RUTAS) => RUTAS[clave][lang];

// El CV de cada idioma: en inglés, la versión en inglés.
export const cvPath = (lang: Lang) => (lang === 'en' ? CV_PATH_EN : CV_PATH);

// Los case studies en inglés viven en src/content/proyectos/en/, así que su
// id lleva el prefijo «en/». El slug público es el mismo en los dos idiomas.
export const slugDe = (entrada: CollectionEntry<'proyectos'>) => entrada.id.replace(/^en\//, '');
export const langDe = (entrada: CollectionEntry<'proyectos'>): Lang => (entrada.id.startsWith('en/') ? 'en' : 'es');
export const hrefProyecto = (lang: Lang, slug: string) => `${RUTAS.proyectos[lang]}${slug}/`;

// Proyectos publicados de un idioma, en el orden del listado.
export async function getProyectos(lang: Lang) {
  return (await getCollection('proyectos', (e) => !e.data.borrador && langDe(e) === lang)).sort(
    (a, b) => a.data.orden - b.data.orden || b.data.fecha.valueOf() - a.data.fecha.valueOf(),
  );
}

// La misma página en el otro idioma, para el enlace del globo. Lo que no
// tiene equivalente (el blog sólo existe en español) cae en la portada.
export function equivalente(pathname: string, destino: Lang): string {
  const origen: Lang = destino === 'en' ? 'es' : 'en';
  for (const clave of Object.keys(RUTAS) as (keyof typeof RUTAS)[]) {
    const desde = RUTAS[clave][origen];
    if (clave === 'inicio') continue;
    if (pathname.startsWith(desde)) return RUTAS[clave][destino] + pathname.slice(desde.length);
  }
  return RUTAS.inicio[destino];
}

// Textos de interfaz. Lo que es contenido (case studies, páginas) vive en sus
// propios archivos; aquí sólo lo que repiten los componentes.
export const UI = {
  es: {
    nav: ['Inicio', 'Proyectos', 'Sobre mí', 'Contacto'],
    navAria: 'Principal',
    descargarCv: 'Descargar CV',
    descargarCvPdf: 'Descargar CV (PDF)',
    descargarCvCompleto: 'Descargar CV completo (PDF) →',
    cambiarIdioma: 'English',
    cambiarIdiomaAria: 'Ver esta página en inglés',
    modoOscuro: 'Modo oscuro',
    escribeme: 'Escríbeme',
    verProyectos: 'Ver proyectos',
    verCaseStudy: 'Ver case study',
    verTodos: 'Ver todos →',
    proyectoAnterior: 'Proyecto anterior',
    proyectoSiguiente: 'Proyecto siguiente',
    carrusel: 'carrusel',
    volverProyectos: '← Proyectos',
    recorrido: 'Recorrido',
    datosProyecto: 'Datos del proyecto',
    participantes: 'Participantes',
    siguienteCaso: 'Siguiente case study',
    sistemaAProducto: 'Del sistema base al producto',
    componentes: 'Componentes',
    herramientasQueUso: 'Herramientas que uso',
    areasExperiencia: 'Áreas de experiencia',
    idiomas: 'Idiomas',
    hablemos: '¡Hablemos!',
    contactameHoy: 'contáctame hoy',
    ctaTitulo: 'Lista para unirme a tu equipo de producto.',
    ctaTexto: 'Estoy abierta a nuevos retos profesionales y a oportunidades a jornada completa.',
    disponibilidad: 'Disponible para nuevas oportunidades',
    ubicacion: 'Valencia, España',
    rol: 'Product Designer UX/UI',
    tagline: 'Traduzco necesidades de negocio en interfaces intuitivas, accesibles y escalables.',
    descripcion:
      'Portfolio de Estephany Mago, Product Designer UX/UI en Valencia. Sistemas de diseño, accesibilidad y producto SaaS contados como case studies.',
  },
  en: {
    nav: ['Home', 'Projects', 'About', 'Contact'],
    navAria: 'Main',
    descargarCv: 'Download CV',
    descargarCvPdf: 'Download CV (PDF)',
    descargarCvCompleto: 'Download full CV (PDF) →',
    cambiarIdioma: 'Español',
    cambiarIdiomaAria: 'View this page in Spanish',
    modoOscuro: 'Dark mode',
    escribeme: 'Email me',
    verProyectos: 'View projects',
    verCaseStudy: 'View case study',
    verTodos: 'View all →',
    proyectoAnterior: 'Previous project',
    proyectoSiguiente: 'Next project',
    carrusel: 'carousel',
    volverProyectos: '← Projects',
    recorrido: 'Journey',
    datosProyecto: 'Project details',
    participantes: 'Participants',
    siguienteCaso: 'Next case study',
    sistemaAProducto: 'From the base system to the product',
    componentes: 'Components',
    herramientasQueUso: 'Tools I use',
    areasExperiencia: 'Areas of expertise',
    idiomas: 'Languages',
    hablemos: "Let's talk!",
    contactameHoy: 'get in touch today',
    ctaTitulo: 'Ready to join your product team.',
    ctaTexto: "I'm open to new professional challenges and full-time opportunities.",
    disponibilidad: 'Available for new opportunities',
    ubicacion: 'Valencia, Spain',
    rol: 'Product Designer UX/UI',
    tagline: 'I translate business needs into intuitive, accessible and scalable interfaces.',
    descripcion:
      'Portfolio of Estephany Mago, Product Designer UX/UI based in Valencia. Design systems, accessibility and SaaS product work told as case studies.',
  },
} as const;

export const t = (url: URL) => UI[getLang(url)];
