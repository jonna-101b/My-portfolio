import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { ImageWithFallback, parseImageUrl } from './imageUtils';
import { POPULAR_ICONS } from './popularIcons';

// Extract all valid icon objects from pre-indexed popular icons
const rawIcons = Object.values(POPULAR_ICONS).filter(
  (icon) => icon && typeof icon === 'object' && icon.title && icon.slug && icon.path
);

// Pre-indexed lookup maps for instant O(1) resolution
const slugMap = new Map();
const titleMap = new Map();
const normalizedMap = new Map();
const dynamicIconCache = new Map();

rawIcons.forEach((icon) => {
  slugMap.set(icon.slug.toLowerCase(), icon);
  titleMap.set(icon.title.toLowerCase(), icon);

  const normSlug = icon.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normTitle = icon.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  normalizedMap.set(normSlug, icon);
  normalizedMap.set(normTitle, icon);
});

// Dedicated LinkedIn Icon Object (since Simple Icons removed LinkedIn due to brand policy)
export const LINKEDIN_ICON = {
  title: 'LinkedIn',
  name: 'LinkedIn',
  slug: 'linkedin',
  hex: '0A66C2',
  isMui: true,
  path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.64 1.64 1.64 1.64 0 0 0 1.64 1.63 1.64 1.64 0 0 0 1.63-1.63 1.64 1.64 0 0 0-1.63-1.64',
};

// Dedicated Java Icon Object
export const JAVA_ICON = {
  title: 'Java',
  name: 'Java',
  slug: 'java',
  hex: 'ED8B00',
  path: 'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639',
};

// Dedicated Canva Icon Object
export const CANVA_ICON = {
  title: 'Canva',
  name: 'Canva',
  slug: 'canva',
  hex: '00C4CC',
  path: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z',
};

// Register custom icons in lookup maps and rawIcons list
[LINKEDIN_ICON, JAVA_ICON, CANVA_ICON].forEach((customIcon) => {
  slugMap.set(customIcon.slug.toLowerCase(), customIcon);
  titleMap.set(customIcon.title.toLowerCase(), customIcon);
  normalizedMap.set(customIcon.slug.toLowerCase().replace(/[^a-z0-9]/g, ''), customIcon);
  normalizedMap.set(customIcon.title.toLowerCase().replace(/[^a-z0-9]/g, ''), customIcon);
  if (!rawIcons.some((icon) => icon.slug === customIcon.slug)) {
    rawIcons.push(customIcon);
  }
});

// Common tech & social aliases and variations
export const TECH_ALIASES = {
  // Social Media & Platforms
  linkedin: 'linkedin',
  'linked-in': 'linkedin',
  'linkedin-original': 'linkedin',
  twitter: 'x',
  'twitter / x': 'x',
  'x / twitter': 'x',
  x: 'x',
  xcorp: 'x',
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'bitbucket',
  facebook: 'facebook',
  meta: 'meta',
  instagram: 'instagram',
  youtube: 'youtube',
  yt: 'youtube',
  reddit: 'reddit',
  discord: 'discord',
  whatsapp: 'whatsapp',
  tiktok: 'tiktok',
  snapchat: 'snapchat',
  pinterest: 'pinterest',
  telegram: 'telegram',
  tumblr: 'tumblr',
  medium: 'medium',
  twitch: 'twitch',
  quora: 'quora',
  threads: 'threads',
  bluesky: 'bluesky',
  bsky: 'bluesky',
  dribbble: 'dribbble',
  behance: 'behance',
  stackoverflow: 'stackoverflow',
  'stack overflow': 'stackoverflow',
  spotify: 'spotify',
  slack: 'slack',
  devdotto: 'devdotto',
  'dev.to': 'devdotto',
  devto: 'devdotto',
  hashnode: 'hashnode',
  kaggle: 'kaggle',
  leetcode: 'leetcode',
  hackerrank: 'hackerrank',
  codewars: 'codewars',
  gmail: 'gmail',
  google: 'google',
  mail: 'gmail',

  // Web & Frameworks
  vue: 'vuedotjs',
  vuejs: 'vuedotjs',
  'vue.js': 'vuedotjs',
  node: 'nodedotjs',
  nodejs: 'nodedotjs',
  'node.js': 'nodedotjs',
  next: 'nextdotjs',
  nextjs: 'nextdotjs',
  'next.js': 'nextdotjs',
  nuxt: 'nuxt',
  nuxtjs: 'nuxt',
  'nuxt.js': 'nuxt',
  express: 'express',
  expressjs: 'express',
  'express.js': 'express',
  react: 'react',
  'react.js': 'react',
  'react-native': 'react',
  'react native': 'react',
  reactnative: 'react',
  tailwind: 'tailwindcss',
  tailwindcss: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  bootstrap: 'bootstrap',
  redux: 'redux',
  'redux-toolkit': 'redux',
  materialui: 'mui',
  'material-ui': 'mui',
  'material ui': 'mui',
  mui: 'mui',
  jquery: 'jquery',

  // Backend & Languages
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  py: 'python',
  python: 'python',
  'c++': 'cplusplus',
  cpp: 'cplusplus',
  cplusplus: 'cplusplus',
  'c#': 'csharp',
  cs: 'csharp',
  csharp: 'csharp',
  c: 'c',
  golang: 'go',
  go: 'go',
  rust: 'rust',
  ruby: 'ruby',
  'ruby on rails': 'rubyonrails',
  rails: 'rubyonrails',
  rubyonrails: 'rubyonrails',
  php: 'php',
  java: 'java',
  kotlin: 'kotlin',
  swift: 'swift',
  dart: 'dart',
  html: 'html5',
  html5: 'html5',
  css: 'css',
  css3: 'css',
  sass: 'sass',
  scss: 'sass',

  // Databases & Cloud
  mongo: 'mongodb',
  mongodb: 'mongodb',
  postgres: 'postgresql',
  postgresql: 'postgresql',
  'postgres sql': 'postgresql',
  mysql: 'mysql',
  sqlite: 'sqlite',
  redis: 'redis',
  firebase: 'firebase',
  supabase: 'supabase',
  gcp: 'googlecloud',
  'google cloud': 'googlecloud',
  googlecloud: 'googlecloud',
  cloudflare: 'cloudflare',
  digitalocean: 'digitalocean',
  vercel: 'vercel',
  netlify: 'netlify',
  docker: 'docker',
  kubernetes: 'kubernetes',
  k8s: 'kubernetes',
  terraform: 'terraform',
  jenkins: 'jenkins',
  git: 'git',

  // Design
  figma: 'figma',
  canva: 'canva',
  sketch: 'sketch',
  framer: 'framer',
  blender: 'blender',
  inkscape: 'inkscape',
  gimp: 'gimp',

  // Testing & Tools
  jest: 'jest',
  mocha: 'mocha',
  cypress: 'cypress',
  selenium: 'selenium',
  graphql: 'graphql',
  spring: 'springboot',
  springboot: 'springboot',
  'spring boot': 'springboot',
  electron: 'electron',
  socketio: 'socketdotio',
  'socket.io': 'socketdotio',
  socketdotio: 'socketdotio',
  gatsby: 'gatsby',
  mapbox: 'mapbox',
  googlemaps: 'googlemaps',
  'google maps': 'googlemaps',
  'aws amplify': 'amazonaws',
  aws: 'amazonaws',
};

/**
 * Resolves an icon synchronously by slug, title, alias, or normalized name
 * @param {string} name - The icon slug or name
 * @returns {object|null} The icon object or null
 */
export function getSimpleIcon(name) {
  if (!name || typeof name !== 'string') return null;

  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();

  // Check for LinkedIn special case
  if (lower === 'linkedin' || lower.includes('linkedin')) {
    return LINKEDIN_ICON;
  }

  // 1. Direct slug match
  if (slugMap.has(lower)) {
    return slugMap.get(lower);
  }

  // 2. Alias match
  if (TECH_ALIASES[lower] && slugMap.has(TECH_ALIASES[lower])) {
    return slugMap.get(TECH_ALIASES[lower]);
  }

  // 3. Direct title match
  if (titleMap.has(lower)) {
    return titleMap.get(lower);
  }

  // 4. Normalized alphanumeric match
  const norm = lower.replace(/[^a-z0-9]/g, '');
  if (TECH_ALIASES[norm] && slugMap.has(TECH_ALIASES[norm])) {
    return slugMap.get(TECH_ALIASES[norm]);
  }
  if (normalizedMap.has(norm)) {
    return normalizedMap.get(norm);
  }

  // 5. Prefix match in rawIcons
  if (norm.length >= 2) {
    const prefixMatch = rawIcons.find(
      (icon) =>
        icon.slug.toLowerCase().startsWith(lower) ||
        icon.title.toLowerCase().startsWith(lower) ||
        icon.slug.replace(/[^a-z0-9]/g, '').startsWith(norm) ||
        icon.title.toLowerCase().replace(/[^a-z0-9]/g, '').startsWith(norm)
    );
    if (prefixMatch) return prefixMatch;
  }

  // 6. Check dynamic cache (for exotic icons loaded asynchronously)
  if (dynamicIconCache.has(lower)) {
    return dynamicIconCache.get(lower);
  }

  return null;
}

/**
 * Generic fallback SVG code icon when an icon is not found
 */
export const FallbackIcon = ({ size, color, className, style }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </svg>
);

/**
 * SimpleIcon Component
 * Renders an SVG icon from the popular pre-indexed collection, Material UI LinkedIn fallback, or image fallback.
 * Automatically loads any exotic unlisted icon from the full library in the background if necessary.
 */
export function SimpleIcon({
  name,
  color = 'var(--icon-opt-1)',
  size = '1em',
  className = '',
  style = {},
  title,
}) {
  const iconKey = typeof name === 'object' ? name?.icon || name?.name || name?.slug : name;
  const trimmedKey = typeof iconKey === 'string' ? iconKey.trim() : '';
  const lowerKey = trimmedKey.toLowerCase();

  const isExternalImage = Boolean(
    trimmedKey &&
      (trimmedKey.startsWith('http://') ||
        trimmedKey.startsWith('https://') ||
        trimmedKey.startsWith('data:') ||
        trimmedKey.startsWith('/') ||
        trimmedKey.endsWith('.png') ||
        trimmedKey.endsWith('.jpg') ||
        trimmedKey.endsWith('.svg'))
  );

  const isLinkedIn = Boolean(
    lowerKey === 'linkedin' || lowerKey === 'linked-in' || lowerKey.includes('linkedin')
  );

  const synchronousIcon = trimmedKey && !isExternalImage ? getSimpleIcon(trimmedKey) : null;
  const [asyncIcon, setAsyncIcon] = React.useState(null);

  React.useEffect(() => {
    if (!trimmedKey || isExternalImage || isLinkedIn || synchronousIcon) {
      return;
    }

    import('./simpleIconSearch')
      .then(({ getDynamicSimpleIcon }) => {
        const resolved = getDynamicSimpleIcon(trimmedKey);
        if (resolved) {
          dynamicIconCache.set(lowerKey, resolved);
          setAsyncIcon(resolved);
        }
      })
      .catch(() => {});
  }, [trimmedKey, lowerKey, isExternalImage, isLinkedIn, synchronousIcon]);

  if (!name || typeof iconKey !== 'string' || !trimmedKey) {
    return <FallbackIcon size={size} color={color} className={className} style={style} />;
  }

  // 1. LinkedIn specific check (Material UI LinkedIn fallback)
  if (isLinkedIn) {
    return (
      <LinkedInIcon
        className={`simple-icon mui-linkedin-icon ${className}`.trim()}
        style={{
          fontSize: size,
          width: size,
          height: size,
          color: color,
          fill: color,
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
          ...style,
        }}
        aria-label={title || 'LinkedIn'}
      />
    );
  }

  // 2. Handle external image URLs or local assets
  if (isExternalImage) {
    return (
      <ImageWithFallback
        src={parseImageUrl(trimmedKey)}
        alt={title || (typeof name === 'string' ? name : name?.name || 'Icon')}
        className={className}
        fallbackColor="transparent"
        fallbackIcon={<CodeOutlinedIcon style={{ fontSize: size, color: color || 'currentColor' }} />}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle',
          ...style,
        }}
      />
    );
  }

  const icon = synchronousIcon || asyncIcon;

  if (!icon) {
    return <FallbackIcon size={size} color={color} className={className} style={style} />;
  }

  // If icon is the special LinkedIn MUI wrapper
  if (icon.isMui && icon.slug === 'linkedin') {
    return (
      <LinkedInIcon
        className={`simple-icon mui-linkedin-icon ${className}`.trim()}
        style={{
          fontSize: size,
          width: size,
          height: size,
          color: color,
          fill: color,
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
          ...style,
        }}
        aria-label={title || 'LinkedIn'}
      />
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      className={`simple-icon ${className}`.trim()}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title || icon.title}
    >
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  );
}

export default SimpleIcon;
