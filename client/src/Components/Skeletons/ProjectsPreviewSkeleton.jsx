import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function ProjectsPreviewSkeleton() {
        return (
                <div className="projects-preview-skeleton" aria-label="Loading featured projects">
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <SkeletonElement type="title" width="200px" height="34px" />
                                <SkeletonElement type="text" width="340px" height="16px" />
                        </div>

                        {/* Projects Cards Grid */}
                        <div className="sk-projects-grid">
                                {[1, 2, 3].map((item) => (
                                        <div key={item} className="skeleton-card sk-project-card">
                                                {/* Project Cover Image */}
                                                <SkeletonElement type="rect" width="100%" height="180px" style={{ borderRadius: '14px' }} />

                                                {/* Title & Badge */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <SkeletonElement type="title" width="160px" height="24px" />
                                                        <SkeletonElement type="pill" width="80px" height="22px" />
                                                </div>

                                                {/* Domains */}
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                        <SkeletonElement type="pill" width="70px" height="20px" />
                                                        <SkeletonElement type="pill" width="85px" height="20px" />
                                                </div>

                                                {/* Brief description */}
                                                <SkeletonElement type="text" width="100%" height="14px" />
                                                <SkeletonElement type="text" width="80%" height="14px" />

                                                {/* Tech stack icons */}
                                                <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                                                        <SkeletonElement type="circle" width="32px" height="32px" />
                                                        <SkeletonElement type="circle" width="32px" height="32px" />
                                                        <SkeletonElement type="circle" width="32px" height="32px" />
                                                </div>

                                                {/* Links */}
                                                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '0.75rem' }}>
                                                        <SkeletonElement type="button" width="110px" height="36px" />
                                                        <SkeletonElement type="button" width="110px" height="36px" />
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default ProjectsPreviewSkeleton;
