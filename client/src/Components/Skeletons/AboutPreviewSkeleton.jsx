import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function AboutPreviewSkeleton() {
        return (
                <div className="about-preview-skeleton" aria-label="Loading about preview">
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <SkeletonElement type="title" width="160px" height="32px" />
                                <SkeletonElement type="text" width="300px" height="16px" />
                        </div>

                        {/* Card Box */}
                        <div className="skeleton-card sk-card">
                                <div className="sk-top-row">
                                        <SkeletonElement type="avatar" width="90px" height="90px" />
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                                <SkeletonElement type="title" width="220px" height="28px" />
                                                <SkeletonElement type="pill" width="160px" height="26px" />
                                        </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <SkeletonElement type="text" width="100%" height="15px" />
                                        <SkeletonElement type="text" width="96%" height="15px" />
                                        <SkeletonElement type="text" width="70%" height="15px" />
                                </div>

                                <div style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                                        <SkeletonElement type="button" width="140px" height="40px" />
                                </div>
                        </div>
                </div>
        );
}

export default AboutPreviewSkeleton;
