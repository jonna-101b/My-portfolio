import { useState, useContext, useEffect } from 'react';
import { DeleteContext } from './Context/DeleteContext';

// MUI Icons
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

import './ConfirmDelete.css';

function ConfirmDelete() {
        const { deleteTarget, closeDeleteModal } = useContext(DeleteContext);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
                const handleKeyDown = (e) => {
                        if (e.key === 'Escape' && deleteTarget && !loading) {
                                closeDeleteModal();
                        }
                };

                window.addEventListener('keydown', handleKeyDown);
                return () => window.removeEventListener('keydown', handleKeyDown);
        }, [deleteTarget, loading, closeDeleteModal]);

        if (!deleteTarget) return null;

        const {
                title,
                type = "Item",
                componentName = "item",
                details,
                onConfirm
        } = deleteTarget;

        const handleConfirm = async () => {
                if (loading || !onConfirm) return;
                try {
                        setLoading(true);
                        await onConfirm();
                        setLoading(false);
                        closeDeleteModal();
                } catch (error) {
                        console.error(`Error deleting ${componentName}:`, error);
                        setLoading(false);
                        closeDeleteModal();
                }
        };

        const handleBackdropClick = () => {
                if (!loading) {
                        closeDeleteModal();
                }
        };

        return (
                <div className="admin-confirm-delete-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
                        <div className="confirm-delete-card" onClick={(e) => e.stopPropagation()}>
                                {/* Header */}
                                <div className="delete-modal-header">
                                        <div className="delete-badge-title">
                                                <div className="delete-danger-icon-wrapper">
                                                        <DeleteForeverRoundedIcon className="danger-icon" />
                                                </div>
                                                <div className="header-text-group">
                                                        <h3 className="delete-modal-title">Delete {type}?</h3>
                                                        <span className="delete-modal-subtitle">Permanent action</span>
                                                </div>
                                        </div>

                                        <button
                                                type="button"
                                                className="delete-modal-close-btn"
                                                onClick={closeDeleteModal}
                                                disabled={loading}
                                                aria-label="Cancel and close"
                                                title="Close"
                                        >
                                                <CloseRoundedIcon />
                                        </button>
                                </div>

                                {/* Body */}
                                <div className="delete-modal-body">
                                        <div className="warning-callout">
                                                <WarningAmberRoundedIcon className="warning-callout-icon" />
                                                <p className="warning-callout-text">
                                                        This action cannot be undone. This {componentName.toLowerCase()} and its related data will be permanently removed.
                                                </p>
                                        </div>

                                        {title && (
                                                <div className="delete-target-preview">
                                                        <span className="preview-label">{type} Name</span>
                                                        <p className="preview-title">"{title}"</p>
                                                        {details && <p className="preview-details">{details}</p>}
                                                </div>
                                        )}
                                </div>

                                {/* Footer Actions */}
                                <div className="delete-modal-footer">
                                        <button
                                                type="button"
                                                className="delete-cancel-btn"
                                                onClick={closeDeleteModal}
                                                disabled={loading}
                                        >
                                                <span>Cancel</span>
                                        </button>

                                        <button
                                                type="button"
                                                className="delete-confirm-btn"
                                                onClick={handleConfirm}
                                                disabled={loading}
                                        >
                                                <DeleteOutlineRoundedIcon className="confirm-delete-icon" />
                                                <span>{loading ? "Deleting..." : `Delete ${type}`}</span>
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

export default ConfirmDelete;
