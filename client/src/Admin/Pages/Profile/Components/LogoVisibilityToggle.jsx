import useProfileReducer from '../../../../Hooks/useProfileReducer';
import '../Styles/LogoVisibilityToggle.css';

function LogoVisibilityToggle() {
        const { profile, updateLogoVisibility } = useProfileReducer();
        const { logoVisible, logo } = profile || {};

        const isVisible = logoVisible === true || logoVisible === "true" || (logoVisible === undefined && true);

        const handleToggleLogoVisibility = () => {
                updateLogoVisibility(!isVisible);
        };

        return (
                <div className="logo-visibility-row">
                        <div className="logo-visibility-info">
                                <span className="logo-visibility-label">Logo visibility</span>
                                {!logo && (
                                        <span className="logo-visibility-hint">Upload logo to show in navbar</span>
                                )}
                        </div>
                        <button
                                type="button"
                                role="switch"
                                aria-checked={isVisible}
                                className={`toggle-switch ${isVisible ? "on" : "off"}`}
                                onClick={handleToggleLogoVisibility}
                                title={isVisible ? "Hide logo in navbar (show nickname instead)" : "Show logo in navbar"}
                        >
                                <span className="toggle-thumb" />
                        </button>
                </div>
        );
}

export default LogoVisibilityToggle;
