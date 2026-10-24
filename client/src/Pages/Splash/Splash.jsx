import { useState, useEffect, useCallback, useMemo } from 'react';
import useProfileReducer from '../../Hooks/useProfileReducer';
import { parseImageUrl } from '../../Utils/imageUtils';
import './Splash.css';

/**
 * Splash screen displayed before public pages load, modeled after modern app intros (e.g. Duolingo).
 * Only displays when backend provides a profile logo. Directly renders the logo and name without fallbacks.
 * Uses CSS variables from App.css for consistent light/dark theme styling.
 * 
 * @param {object} [props]
 * @param {object} [props.profile] - Profile data (optional, defaults to useProfileReducer)
 * @param {function} [props.onFinish] - Callback invoked when splash animation completes or is skipped
 * @param {number} [props.duration=2200] - Duration in ms before transition starts
 */
function Splash({ profile: propProfile, onFinish, duration = 2200 }) {
    const { profile: contextProfile } = useProfileReducer();
    const profile = propProfile || contextProfile || {};

    const [isFadingOut, setIsFadingOut] = useState(false);

    // Only display when logo is provided
    const hasLogo = Boolean(profile?.logo && typeof profile.logo === 'string' && profile.logo.trim() !== '');

    // If no logo is provided, dismiss immediately
    useEffect(() => {
        if (!hasLogo && typeof onFinish === 'function') {
            onFinish();
        }
    }, [hasLogo, onFinish]);

    // Nickname if provided, otherwise First Name + Last Name, no generic fallbacks
    const displayName = useMemo(() => {
        const nickname = typeof profile?.nickName === 'string' ? profile.nickName.trim() : '';
        const firstName = typeof profile?.firstName === 'string' ? profile.firstName.trim() : '';
        const lastName = typeof profile?.lastName === 'string' ? profile.lastName.trim() : '';
        const fullName = [firstName, lastName].filter(Boolean).join(' ');
        return nickname || fullName || '';
    }, [profile?.nickName, profile?.firstName, profile?.lastName]);

    const logoUrl = useMemo(() => {
        return parseImageUrl(profile?.logo);
    }, [profile?.logo]);

    const handleDismiss = useCallback(() => {
        if (isFadingOut) return;
        setIsFadingOut(true);
        setTimeout(() => {
            if (typeof onFinish === 'function') {
                onFinish();
            }
        }, 450);
    }, [isFadingOut, onFinish]);

    // Auto-advance timer
    useEffect(() => {
        if (!hasLogo) return;
        const timer = setTimeout(() => {
            handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
    }, [handleDismiss, duration, hasLogo]);

    // Keyboard support: Escape, Enter, Space to skip
    useEffect(() => {
        if (!hasLogo) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                handleDismiss();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleDismiss, hasLogo]);

    if (!hasLogo) {
        return null;
    }

    return (
        <aside
            className={`splash-container ${isFadingOut ? 'splash-fade-out' : ''}`}
            onClick={handleDismiss}
            role="status"
            aria-live="polite"
            aria-label="Welcome screen"
        >
            {/* Ambient Radial Aura */}
            <div className="splash-ambient-glow" />

            {/* Top Bar with Skip Action */}
            <div className="splash-top-bar">
                <button
                    type="button"
                    className="splash-skip-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss();
                    }}
                    aria-label="Skip intro screen"
                >
                    Skip
                </button>
            </div>

            {/* Centered Mascot/Logo Area */}
            <div className="splash-center">

                <div className="splash-logo-frame">
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt={displayName || 'Logo'}
                            className="splash-logo-img"
                        />
                    )}
                </div>
            </div>

            {/* Bottom Brand Wordmark */}
            <div className="splash-bottom">
                {displayName && (
                    <h1 className="splash-brand-title">
                        {displayName.toLowerCase()}.
                    </h1>
                )}
            </div>
        </aside>
    );
}

export default Splash;
