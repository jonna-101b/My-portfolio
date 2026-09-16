import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function ProjectsMainSectionSkeleton() {
        return (
                <div className="projects-page-skeleton" aria-label="Loading projects">
                        {/* Domain Category Pills */}
                        <div className="sk-categories">
                                <SkeletonElement type="pill" width="80px" height="36px" />
                                <SkeletonElement type="pill" width="120px" height="36px" />
                                <SkeletonElement type="pill" width="140px" height="36px" />
                                <SkeletonElement type="pill" width="110px" height="36px" />
                        </div>

                        {/* Projects Grid */}
                        <div className="sk-projects-grid">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div
                                                key={item}
                                                className="skeleton-card"
                                                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '20px' }}
                                        >
                                                {/* Project Preview Image */}
                                                <SkeletonElement type="rect" width="100%" height="190px" style={{ borderRadius: '14px' }} />

                                                {/* Header */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <SkeletonElement type="title" width="160px" height="24px" />
                                                        <SkeletonElement type="pill" width="75px" height="20px" />
                                                </div>

                                                {/* Tech Stack Avatars */}
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                        <SkeletonElement type="circle" width="30px" height="30px" />
                                                        <SkeletonElement type="circle" width="30px" height="30px" />
                                                        <SkeletonElement type="circle" width="30px" height="30px" />
                                                </div>

                                                <div style={{ borderTop: '1px solid var(--skeleton-border)', margin: '0.25rem 0' }} />

                                                {/* Footer Actions */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                                <SkeletonElement type="circle" width="32px" height="32px" />
                                                                <SkeletonElement type="circle" width="32px" height="32px" />
                                                        </div>
                                                        <SkeletonElement type="button" width="120px" height="36px" />
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default ProjectsMainSectionSkeleton;
