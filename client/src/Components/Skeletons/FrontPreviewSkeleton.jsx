import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function FrontPreviewSkeleton() {
        return (
                <div className="front-preview-skeleton" aria-label="Loading hero content">
                        {/* Name Line */}
                        <div className="sk-greeting">
                                <SkeletonElement type="circle" width="28px" height="28px" />
                                <SkeletonElement type="title" width="240px" height="36px" />
                                <SkeletonElement type="circle" width="28px" height="28px" />
                        </div>

                        {/* Profession Pills */}
                        <div className="sk-professions">
                                <SkeletonElement type="pill" width="160px" height="34px" />
                                <SkeletonElement type="pill" width="140px" height="34px" />
                                <SkeletonElement type="pill" width="150px" height="34px" />
                        </div>

                        {/* Bio Lines */}
                        <div className="sk-bio-lines">
                                <SkeletonElement type="text" width="90%" height="16px" />
                                <SkeletonElement type="text" width="75%" height="16px" />
                        </div>

                        {/* Action Buttons */}
                        <div className="sk-buttons">
                                <SkeletonElement type="button" width="130px" height="42px" />
                                <SkeletonElement type="button" width="160px" height="42px" />
                        </div>

                        {/* Hero Illustration Box */}
                        <SkeletonElement type="rect" className="sk-hero-image" />
                </div>
        );
}

export default FrontPreviewSkeleton;
