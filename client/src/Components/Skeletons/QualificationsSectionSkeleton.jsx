import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function QualificationsSectionSkeleton() {
        return (
                <div className="qualifications-section-skeleton" aria-label="Loading qualifications">
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <SkeletonElement type="title" width="220px" height="34px" />
                                <SkeletonElement type="text" width="360px" height="16px" />
                        </div>

                        {/* Qualifications Timeline Cards Grid */}
                        <div className="sk-qual-grid">
                                {[1, 2, 3, 4].map((item) => (
                                        <div
                                                key={item}
                                                className="skeleton-card"
                                                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}
                                        >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                <SkeletonElement type="title" width="180px" height="22px" />
                                                                <SkeletonElement type="text" width="120px" height="14px" />
                                                        </div>
                                                        <SkeletonElement type="pill" width="80px" height="24px" />
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '0.5rem' }}>
                                                        <SkeletonElement type="text" width="100%" height="13px" />
                                                        <SkeletonElement type="text" width="85%" height="13px" />
                                                </div>

                                                <div style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
                                                        <SkeletonElement type="circle" width="36px" height="36px" />
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default QualificationsSectionSkeleton;
