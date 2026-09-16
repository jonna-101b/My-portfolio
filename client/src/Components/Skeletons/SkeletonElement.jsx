import React from 'react';

/**
 * Polymorphic Skeleton Element
 * @param {string} type - 'text' | 'title' | 'circle' | 'rect' | 'pill' | 'button' | 'card' | 'avatar'
 * @param {string|number} width - CSS width (e.g. '100%', '120px', '4rem')
 * @param {string|number} height - CSS height (e.g. '16px', '48px', '10rem')
 * @param {string} className - Additional CSS class names
 * @param {object} style - Custom inline styles
 * @param {boolean} isAdmin - Use admin skeleton theme tokens
 */
function SkeletonElement({
        type = 'text',
        width,
        height,
        className = '',
        style = {},
        isAdmin = false,
        children
}) {
        const typeClasses = {
                text: 'skeleton-text',
                title: 'skeleton-text',
                circle: 'skeleton-circle',
                rect: 'skeleton-box',
                pill: 'skeleton-pill',
                button: 'skeleton-pill',
                avatar: 'skeleton-circle',
                card: 'skeleton-card'
        };

        const defaultHeight = {
                text: '14px',
                title: '28px',
                circle: '48px',
                rect: '100px',
                pill: '32px',
                button: '42px',
                avatar: '56px',
                card: 'auto'
        };

        const defaultWidth = {
                text: '100%',
                title: '60%',
                circle: '48px',
                rect: '100%',
                pill: '100px',
                button: '140px',
                avatar: '56px',
                card: '100%'
        };

        const selectedClass = typeClasses[type] || 'skeleton-box';
        const adminClass = isAdmin ? `admin-${selectedClass}` : '';

        const computedStyle = {
                width: width !== undefined ? width : defaultWidth[type],
                height: height !== undefined ? height : defaultHeight[type],
                ...style
        };

        return (
                <div
                        className={`${selectedClass} ${adminClass} ${className}`.trim()}
                        style={computedStyle}
                        aria-hidden="true"
                >
                        {children}
                </div>
        );
}

export default SkeletonElement;
