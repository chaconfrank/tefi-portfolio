export const SITE_TITLE = 'Tefi';
export const SITE_DESCRIPTION =
  'Portfolio personal: proyectos, experiencia y notas sobre desarrollo.';
export const SITE_AUTHOR = 'Tefi';

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export const SOCIALS = [
  { href: 'https://github.com/tefi', label: 'GitHub' },
  { href: 'https://linkedin.com/in/tefi', label: 'LinkedIn' },
  { href: 'mailto:hola@tefi.dev', label: 'Email' },
] as const;
