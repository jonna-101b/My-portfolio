import React from 'react';
import * as simpleIcons from 'simple-icons';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Extract all valid icon objects from simple-icons
const rawIcons = Object.values(simpleIcons).filter(
  (icon) => icon && typeof icon === 'object' && icon.title && icon.slug && icon.path
);

// Pre-indexed lookup maps for instant O(1) resolution
const slugMap = new Map();
const titleMap = new Map();
const normalizedMap = new Map();

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

// Register LinkedIn in lookup maps
slugMap.set('linkedin', LINKEDIN_ICON);
titleMap.set('linkedin', LINKEDIN_ICON);
normalizedMap.set('linkedin', LINKEDIN_ICON);

// Common tech & social aliases and variations
const TECH_ALIASES = {
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
  wechat: 'wechat',
  vk: 'vk',
  line: 'line',
  mastodon: 'mastodon',
  threads: 'threads',
  bluesky: 'bluesky',
  bsky: 'bluesky',
  dribbble: 'dribbble',
  behance: 'behance',
  stackoverflow: 'stackoverflow',
  'stack overflow': 'stackoverflow',
  codepen: 'codepen',
  spotify: 'spotify',
  substack: 'substack',
  patreon: 'patreon',
  slack: 'slack',
  skype: 'skype',
  zoom: 'zoom',
  signal: 'signal',
  vimeo: 'vimeo',
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
  nuxt: 'nuxtdotjs',
  nuxtjs: 'nuxtdotjs',
  'nuxt.js': 'nuxtdotjs',
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
  sketch: 'sketch',
  framer: 'framer',
  blender: 'blender',
  inkscape: 'inkscape',
  gimp: 'gimp',

  // Testing, Frameworks & Tools
  jest: 'jest',
  mocha: 'mocha',
  cypress: 'cypress',
  selenium: 'selenium',
  graphql: 'graphql',
  spring: 'spring',
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
  'google maps api': 'googlemaps',
  'aws amplify': 'amazonaws',
  aws: 'amazonaws',
};

/**
 * Resolves a simple icon by slug, title, alias, or normalized name
 * @param {string} name - The icon slug or name
 * @returns {object|null} The simple-icon object or null
 */
export function getSimpleIcon(name) {
  if (!name || typeof name !== 'string') return null;

  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();

  // Check for LinkedIn special case (including legacy devicon/flaticon URL remnants)
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

  return null;
}

/**
 * Searches simple-icons library for matching icons
 * @param {string} query - Search term
 * @param {number} limit - Maximum number of results
 * @returns {Array<object>} Matching icon options
 */
export function searchSimpleIcons(query = '', limit = 30) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    // Return a curated list of top popular technologies and social platforms when query is empty
    const popularSlugs = [
      'linkedin', 'github', 'x', 'facebook', 'instagram', 'youtube',
      'discord', 'reddit', 'whatsapp', 'tiktok', 'telegram', 'threads', 'bluesky',
      'react', 'nodedotjs', 'javascript', 'typescript', 'python',
      'vuedotjs', 'nextdotjs', 'angular', 'svelte', 'html5',
      'css', 'tailwindcss', 'mongodb', 'postgresql', 'mysql',
      'docker', 'figma', 'graphql', 'medium', 'dribbble', 'stackoverflow'
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

  // Check LinkedIn match
  if ('linkedin'.includes(q) || 'linkedin'.includes(normQ) || normQ === 'in' || normQ === 'li') {
    exactMatches.push(LINKEDIN_ICON);
  }

  // Check alias matches (e.g. searching 'twitter' points to 'x')
  if (TECH_ALIASES[q] && slugMap.has(TECH_ALIASES[q])) {
    const aliasIcon = slugMap.get(TECH_ALIASES[q]);
    if (!exactMatches.includes(aliasIcon)) {
      exactMatches.push(aliasIcon);
    }
  }

  for (const icon of rawIcons) {
    const titleLower = icon.title.toLowerCase();
    const slugLower = icon.slug.toLowerCase();
    const normTitle = titleLower.replace(/[^a-z0-9]/g, '');
    const normSlug = slugLower.replace(/[^a-z0-9]/g, '');

    if (titleLower === q || slugLower === q || normTitle === normQ || normSlug === normQ) {
      if (!exactMatches.includes(icon)) exactMatches.push(icon);
    } else if (titleLower.startsWith(q) || slugLower.startsWith(q) || normTitle.startsWith(normQ) || normSlug.startsWith(normQ)) {
      prefixMatches.push(icon);
    } else if (titleLower.includes(q) || slugLower.includes(q) || normTitle.includes(normQ) || normSlug.includes(normQ)) {
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
 * Generic fallback SVG code icon when an icon is not found
 */
const FallbackIcon = ({ size, color, className, style }) => (
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
 * Renders an SVG icon from the simple-icons library, Material UI LinkedIn fallback, or an image URL fallback.
 *
 * @param {object} props
 * @param {string|object} props.name - Icon slug, title, or URL
 * @param {string} [props.color='var(--icon-opt-1)'] - Fill color (supports direct hex, CSS variables, currentColor)
 * @param {string|number} [props.size='1em'] - Size of the icon
 * @param {string} [props.className=''] - Custom CSS class
 * @param {object} [props.style={}] - Inline styles
 * @param {string} [props.title] - Tooltip title
 */
export function SimpleIcon({
  name,
  color = 'var(--icon-opt-1)',
  size = '1em',
  className = '',
  style = {},
  title,
}) {
  if (!name) {
    return <FallbackIcon size={size} color={color} className={className} style={style} />;
  }

  // If name is an object (e.g. { name: "React", icon: "react" })
  const iconKey = typeof name === 'object' ? name.icon || name.name || name.slug : name;

  if (typeof iconKey !== 'string') {
    return <FallbackIcon size={size} color={color} className={className} style={style} />;
  }

  const trimmedKey = iconKey.trim();
  const lowerKey = trimmedKey.toLowerCase();

  // 1. LinkedIn specific check (Material UI LinkedIn fallback)
  if (
    lowerKey === 'linkedin' ||
    lowerKey === 'linked-in' ||
    lowerKey.includes('linkedin')
  ) {
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
  if (
    trimmedKey.startsWith('http://') ||
    trimmedKey.startsWith('https://') ||
    trimmedKey.startsWith('data:') ||
    trimmedKey.startsWith('/') ||
    trimmedKey.endsWith('.png') ||
    trimmedKey.endsWith('.jpg') ||
    trimmedKey.endsWith('.svg')
  ) {
    return (
      <img
        src={trimmedKey}
        alt={title || (typeof name === 'string' ? name : name?.name || 'Icon')}
        className={className}
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

  const icon = getSimpleIcon(trimmedKey);

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

