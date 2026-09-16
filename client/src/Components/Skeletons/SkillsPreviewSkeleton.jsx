import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function SkillsPreviewSkeleton() {
        return (
                <div className="skills-preview-skeleton" aria-label="Loading skills preview">
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <SkeletonElement type="title" width="180px" height="34px" />
                                <SkeletonElement type="text" width="220px" height="18px" />
                        </div>

                        {/* Category Filter Pills */}
                        <div className="sk-tabs" style={{ justifyContent: 'center' }}>
                                <SkeletonElement type="pill" width="110px" height="36px" />
                                <SkeletonElement type="pill" width="130px" height="36px" />
                                <SkeletonElement type="pill" width="120px" height="36px" />
                                <SkeletonElement type="pill" width="140px" height="36px" />
                        </div>

                        {/* Tech Cards Grid */}
                        <div className="sk-tech-grid">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div key={item} className="skeleton-card sk-tech-card">
                                                <SkeletonElement type="circle" width="60px" height="60px" />
                                                <SkeletonElement type="text" width="80px" height="14px" />
                                        </div>
                                ))}
                        </div>

                        {/* Soft Skills Section */}
                        <div style={{ marginTop: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                        <SkeletonElement type="title" width="180px" height="24px" />
                                </div>
                                <div className="sk-soft-track">
                                        {[1, 2, 3].map((item) => (
                                                <div key={item} className="skeleton-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <SkeletonElement type="circle" width="40px" height="40px" />
                                                        <SkeletonElement type="title" width="140px" height="20px" />
                                                        <SkeletonElement type="text" width="100%" height="13px" />
                                                        <SkeletonElement type="text" width="85%" height="13px" />
                                                </div>
                                        ))}
                                </div>
                        </div>
                </div>
        );
}

export default SkillsPreviewSkeleton;
