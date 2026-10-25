import * as simpleIcons from 'simple-icons';
import { LINKEDIN_ICON, JAVA_ICON, CANVA_ICON } from './simpleIcons';

// Extract and pre-index all valid icons with precomputed normalized strings
const rawIcons = Object.values(simpleIcons).filter(
  (icon) => icon && typeof icon === 'object' && icon.title && icon.slug && icon.path
);

// Include dedicated custom icons
[LINKEDIN_ICON, JAVA_ICON, CANVA_ICON].forEach((customIcon) => {
  if (!rawIcons.some((i) => i.slug === customIcon.slug)) {
    rawIcons.push(customIcon);
  }
});

// Precompute lower and normalized keys once at initialization so search loop doesn't do regex replacements per keystroke
const indexedIcons = rawIcons.map((icon) => {
  const titleLower = icon.title.toLowerCase();
  const slugLower = icon.slug.toLowerCase();
  const normTitle = titleLower.replace(/[^a-z0-9]/g, '');
  const normSlug = slugLower.replace(/[^a-z0-9]/g, '');
  return {
    icon,
    titleLower,
    slugLower,
    normTitle,
    normSlug,
  };
});

const slugMap = new Map();
const titleMap = new Map();
const normalizedMap = new Map();

indexedIcons.forEach(({ icon, slugLower, titleLower, normSlug, normTitle }) => {
  slugMap.set(slugLower, icon);
  titleMap.set(titleLower, icon);
  normalizedMap.set(normSlug, icon);
  normalizedMap.set(normTitle, icon);
});

/**
 * Searches the full simple-icons library for matching icons (used by Admin forms).
 *
 * @param {string} query - Search term
 * @param {number} limit - Maximum results to return
 * @returns {Array<object>} Formatted icon options
 */
export function searchSimpleIcons(query = '', limit = 30) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    const popularSlugs = [
      'linkedin', 'github', 'x', 'facebook', 'instagram', 'youtube',
      'discord', 'reddit', 'whatsapp', 'tiktok', 'telegram', 'threads', 'bluesky',
      'react', 'nodedotjs', 'javascript', 'typescript', 'python', 'java',
      'vuedotjs', 'nextdotjs', 'angular', 'svelte', 'html5',
      'css', 'tailwindcss', 'mongodb', 'postgresql', 'mysql',
      'docker', 'figma', 'canva', 'graphql', 'medium', 'dribbble', 'stackoverflow'
    ];
    return popularSlugs
      .map((slug) => slugMap.get(slug) || (slug === 'linkedin' ? LINKEDIN_ICON : null))
      .filter(Boolean)
      .map((icon) => ({
        label: icon.title,
        value: icon.title,
        name: icon.title,
        icon: icon.slug,
        slug: icon.slug,
        hex: icon.hex,
      }));
  }

  const q = query.trim().toLowerCase();
  const normQ = q.replace(/[^a-z0-9]/g, '');

  const exactMatches = [];
  const prefixMatches = [];
  const containsMatches = [];

  for (let i = 0; i < indexedIcons.length; i++) {
    const { icon, titleLower, slugLower, normTitle, normSlug } = indexedIcons[i];

    if (titleLower === q || slugLower === q || (normQ && (normTitle === normQ || normSlug === normQ))) {
      exactMatches.push(icon);
    } else if (titleLower.startsWith(q) || slugLower.startsWith(q) || (normQ && (normTitle.startsWith(normQ) || normSlug.startsWith(normQ)))) {
      prefixMatches.push(icon);
    } else if (titleLower.includes(q) || slugLower.includes(q) || (normQ && (normTitle.includes(normQ) || normSlug.includes(normQ)))) {
      containsMatches.push(icon);
    }

    if (exactMatches.length + prefixMatches.length + containsMatches.length >= limit * 2) {
      break;
    }
  }

  const combined = [...exactMatches, ...prefixMatches, ...containsMatches].slice(0, limit);

  return combined.map((icon) => ({
    label: icon.title,
    value: icon.title,
    name: icon.title,
    icon: icon.slug,
    slug: icon.slug,
    hex: icon.hex,
  }));
}

/**
 * Resolves an icon dynamically from the full simple-icons library
 */
export function getDynamicSimpleIcon(name) {
  if (!name || typeof name !== 'string') return null;
  const lower = name.trim().toLowerCase();
  const norm = lower.replace(/[^a-z0-9]/g, '');
  return slugMap.get(lower) || titleMap.get(lower) || normalizedMap.get(norm) || null;
}
