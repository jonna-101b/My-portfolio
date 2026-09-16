import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function AboutMainSectionSkeleton() {
        return (
                <div className="about-page-skeleton" aria-label="Loading about details">
                        <div className="sk-about-grid">
                                {/* Left Column: Profile Avatar & Quick Details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div className="skeleton-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                                <SkeletonElement type="circle" width="160px" height="160px" />
                                                <SkeletonElement type="pill" width="160px" height="28px" />
                                        </div>

                                        <div className="skeleton-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div>
                                                        <SkeletonElement type="text" width="40px" height="12px" />
                                                        <SkeletonElement type="title" width="140px" height="20px" />
                                                </div>
                                                <div>
                                                        <SkeletonElement type="text" width="40px" height="12px" />
                                                        <SkeletonElement type="title" width="180px" height="20px" />
                                                </div>
                                                <div>
                                                        <SkeletonElement type="text" width="60px" height="12px" />
                                                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                                                <SkeletonElement type="circle" width="34px" height="34px" />
                                                                <SkeletonElement type="circle" width="34px" height="34px" />
                                                                <SkeletonElement type="circle" width="34px" height="34px" />
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* Right Column: Detailed Narrative & Skills */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        {/* Bio / About narrative card */}
                                        <div className="skeleton-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                <SkeletonElement type="title" width="180px" height="28px" />
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <SkeletonElement type="text" width="100%" height="15px" />
                                                        <SkeletonElement type="text" width="98%" height="15px" />
                                                        <SkeletonElement type="text" width="95%" height="15px" />
                                                        <SkeletonElement type="text" width="70%" height="15px" />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
                                                        <SkeletonElement type="text" width="98%" height="15px" />
                                                        <SkeletonElement type="text" width="94%" height="15px" />
                                                        <SkeletonElement type="text" width="80%" height="15px" />
                                                </div>
                                        </div>

                                        {/* Core Skills Grid card */}
                                        <div className="skeleton-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                <SkeletonElement type="title" width="150px" height="24px" />
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                                                        {[1, 2, 3, 4, 5, 6].map((item) => (
                                                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--skeleton-card-inner, #222)', borderRadius: '10px' }}>
                                                                        <SkeletonElement type="circle" width="22px" height="22px" />
                                                                        <SkeletonElement type="text" width="60px" height="14px" style={{ margin: 0 }} />
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default AboutMainSectionSkeleton;
