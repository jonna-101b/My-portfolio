import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded';
import { BACKEND_ROOT_URL } from '../Config/env';
import './imageFallback.css';

/**
 * Returns backend root URL for media and uploaded assets
 */
export const getBackendBaseUrl = () => {
    return BACKEND_ROOT_URL;
};

/**
 * Parses any backend image representation (URL string, relative path, legacy port,
 * File/Blob instance, or nested object like { url, preview, path, file }) and returns
 * a valid, displayable image URL string.
 *
 * @param {string|File|Blob|object} source - The image source from backend or state
 * @returns {string} Fully qualified displayable image URL or empty string
 */
export const parseImageUrl = (source) => {
    if (!source) {
        return '';
    }

    // 0. Array of image sources -> take the first element
    if (Array.isArray(source)) {
        return source.length > 0 ? parseImageUrl(source[0]) : '';
    }

    // 1. Browser File or Blob objects (e.g. from file pickers, dropzones, or formData)
    if (typeof window !== 'undefined' && (source instanceof Blob || source instanceof File)) {
        try {
            return URL.createObjectURL(source);
        } catch {
            return '';
        }
    }

    // 2. Object representations from APIs or state (e.g. { url }, { preview }, { path }, { file })
    if (typeof source === 'object' && source !== null) {
        if (source.preview) return parseImageUrl(source.preview);
        if (source.url) return parseImageUrl(source.url);
        if (source.path) return parseImageUrl(source.path);
        if (source.src) return parseImageUrl(source.src);
        if (source.secure_url) return parseImageUrl(source.secure_url);
        if (source.uri) return parseImageUrl(source.uri);
        if (source.file) return parseImageUrl(source.file);

        // Raw buffer / binary object with contentType
        if (source.contentType && source.data) {
            const base64Data = typeof source.data === 'string'
                ? source.data
                : (source.data?.toString ? source.data.toString('base64') : '');
            if (base64Data) {
                return `data:${source.contentType};base64,${base64Data}`;
            }
        }

        if (source.filename) return parseImageUrl(source.filename);
        if (source.name) return parseImageUrl(source.name);
        return '';
    }

    // 3. String URLs / paths
    if (typeof source !== 'string') {
        return '';
    }

    const trimmed = source.trim();
    if (!trimmed) {
        return '';
    }

    // Blob or Data URLs (already usable)
    if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
        return trimmed;
    }

    const backendBase = getBackendBaseUrl();

    // Legacy port 5000 rewrites
    if (trimmed.includes(':5000/uploads/')) {
        const uploadPath = trimmed.substring(trimmed.indexOf('/uploads/'));
        return `${backendBase}${uploadPath}`;
    }

    // Full absolute external or local URLs (http:// or https://)
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }

    // Backend uploads path (/uploads/... or uploads/...)
    if (trimmed.startsWith('/uploads')) {
        return `${backendBase}${trimmed}`;
    }

    if (trimmed.startsWith('uploads/')) {
        return `${backendBase}/${trimmed}`;
    }

    // Bare uploaded image filenames (e.g. '17109283-cover.jpg')
    if (/^[a-zA-Z0-9_\-.]+\.(png|jpe?g|webp|svg|gif|avif|ico|bmp)$/i.test(trimmed)) {
        return `${backendBase}/uploads/images/${trimmed}`;
    }

    // Local client public assets or relative paths (e.g. /favicon.ico, /assets/...)
    return trimmed;
};

// Alias for parseImageUrl
export const parseImage = parseImageUrl;

/**
 * Default fallback configuration
 */
export const DEFAULT_FALLBACK_COLOR = 'var(--card-bg, #1c1c1c)';
export const DEFAULT_FALLBACK_ICON = ImageNotSupportedRoundedIcon;

/**
 * Image component with robust error handling and customizable fallback
 * background color, background icon, background image, and text/initials.
 */
export const ImageWithFallback = forwardRef(function ImageWithFallback(props, ref) {
    const {
        src,
        source,
        alt = '',
        className = '',
        imgClassName = '',
        fallbackClassName = '',
        style = {},
        imgStyle = {},
        fallbackStyle = {},
        fallbackColor,
        fallbackBg,
        fallbackIcon,
        fallbackImage,
        fallbackBgImage,
        fallbackText,
        fallbackInitials,
        iconSize = '2rem',
        iconColor,
        onError,
        onLoad,
        ...restProps
    } = props;

    const rawSource = src !== undefined ? src : source;
    const parsedUrl = useMemo(() => parseImageUrl(rawSource), [rawSource]);

    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Reset error & loaded status whenever the underlying source changes
    useEffect(() => {
        setHasError(false);
        setIsLoaded(false);
    }, [parsedUrl]);

    const handleImageError = (e) => {
        setHasError(true);
        if (typeof onError === 'function') {
            onError(e);
        }
    };

    const handleImageLoad = (e) => {
        setIsLoaded(true);
        if (typeof onLoad === 'function') {
            onLoad(e);
        }
    };

    const isFunctional = Boolean(parsedUrl) && !hasError;

    if (!isFunctional) {
        const resolvedBgColor = fallbackColor || fallbackBg || DEFAULT_FALLBACK_COLOR;
        const resolvedBgImage = fallbackImage || fallbackBgImage;
        const parsedFallbackImage = resolvedBgImage ? parseImageUrl(resolvedBgImage) : null;

        const containerStyle = {
            ...style,
            ...fallbackStyle,
            backgroundColor: resolvedBgColor,
            ...(parsedFallbackImage
                ? {
                    backgroundImage: `url("${parsedFallbackImage}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }
                : {}),
            ...(iconColor ? { '--fallback-icon-color': iconColor } : {}),
            ...(resolvedBgColor ? { '--fallback-bg': resolvedBgColor } : {}),
        };

        const renderIcon = () => {
            if (fallbackInitials) {
                return (
                    <span
                        className="app-image-fallback-initials"
                        style={{ fontSize: iconSize || '1.5rem', color: iconColor }}
                    >
                        {fallbackInitials}
                    </span>
                );
            }

            // Custom icon provided as React Element (e.g. <CodeOutlinedIcon />)
            if (React.isValidElement(fallbackIcon)) {
                return React.cloneElement(fallbackIcon, {
                    style: {
                        fontSize: iconSize,
                        color: iconColor || 'currentColor',
                        ...fallbackIcon.props?.style,
                    },
                });
            }

            // Custom icon provided as Component reference (e.g. CodeOutlinedIcon)
            if (typeof fallbackIcon === 'function') {
                const IconComponent = fallbackIcon;
                return (
                    <IconComponent
                        style={{
                            fontSize: iconSize,
                            color: iconColor || 'currentColor',
                        }}
                    />
                );
            }

            // Default fallback icon
            const DefaultIcon = DEFAULT_FALLBACK_ICON;
            return (
                <DefaultIcon
                    style={{
                        fontSize: iconSize,
                        color: iconColor || 'currentColor',
                    }}
                />
            );
        };

        return (
            <div
                ref={ref}
                className={`app-image-fallback ${className} ${fallbackClassName}`.trim()}
                style={containerStyle}
                role="img"
                aria-label={alt || fallbackText || 'Image fallback'}
            >
                <div className="app-image-fallback-inner">
                    <span className="app-image-fallback-icon" style={{ fontSize: iconSize }}>
                        {renderIcon()}
                    </span>

                    {fallbackText && (
                        <span className="app-image-fallback-text">
                            {fallbackText}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    return (
        <img
            ref={ref}
            src={parsedUrl}
            alt={alt}
            className={`app-image ${isLoaded ? 'loaded' : ''} ${className} ${imgClassName}`.trim()}
            style={{ ...style, ...imgStyle }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            {...restProps}
        />
    );
});

/**
 * Universal image rendering function.
 * Can be invoked either as a standard function:
 *   renderImage(source, { alt, className, fallbackColor, fallbackIcon, ... })
 * or with a props object:
 *   renderImage({ src, alt, className, fallbackColor, fallbackIcon, ... })
 * or used directly as JSX:
 *   <renderImage src={...} /> or <ImageWithFallback src={...} />
 *
 * @param {string|File|Blob|object} sourceOrProps - Image source or complete props object
 * @param {object} [options={}] - Additional rendering options and fallbacks
 * @returns {React.ReactElement}
 */
export function renderImage(sourceOrProps, options = {}) {
    // If called with a props object that contains src/source or is a React props object
    if (
        sourceOrProps &&
        typeof sourceOrProps === 'object' &&
        !(sourceOrProps instanceof Blob) &&
        (sourceOrProps.src !== undefined || sourceOrProps.source !== undefined || options.isComponentCall)
    ) {
        return <ImageWithFallback {...sourceOrProps} />;
    }

    // Called as renderImage(source, options)
    return <ImageWithFallback src={sourceOrProps} {...options} />;
}

// Attach component to function for maximum convenience
renderImage.Component = ImageWithFallback;
renderImage.parse = parseImageUrl;

export default renderImage;
