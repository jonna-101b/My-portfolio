import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function BlogSectionSkeleton() {
        return (
                <div className="blog-section-skeleton" aria-label="Loading featured blogs">
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <SkeletonElement type="title" width="220px" height="34px" />
                                <SkeletonElement type="text" width="320px" height="16px" />
                        </div>

                        {/* Main Layout Grid */}
                        <div className="sk-blog-layout">
                                {/* Main Article Column */}
                                <div className="skeleton-card sk-main-article" style={{ padding: '2rem' }}>
                                        {/* Cover Image */}
                                        <SkeletonElement type="rect" width="100%" height="240px" style={{ borderRadius: '14px' }} />

                                        {/* Title & Subtitle */}
                                        <SkeletonElement type="title" width="85%" height="30px" />
                                        <SkeletonElement type="text" width="55%" height="16px" />

                                        {/* Tags */}
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                <SkeletonElement type="pill" width="65px" height="24px" />
                                                <SkeletonElement type="pill" width="80px" height="24px" />
                                                <SkeletonElement type="pill" width="70px" height="24px" />
                                        </div>

                                        {/* Body paragraphs */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
                                                <SkeletonElement type="text" width="100%" height="14px" />
                                                <SkeletonElement type="text" width="98%" height="14px" />
                                                <SkeletonElement type="text" width="92%" height="14px" />
                                                <SkeletonElement type="text" width="65%" height="14px" />
                                        </div>

                                        {/* Action buttons */}
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
                                                <SkeletonElement type="button" width="130px" height="40px" />
                                                <SkeletonElement type="button" width="130px" height="40px" />
                                        </div>
                                </div>

                                {/* Sidebar Column */}
                                <div className="sk-sidebar">
                                        <div style={{ marginBottom: '0.5rem' }}>
                                                <SkeletonElement type="title" width="140px" height="22px" />
                                        </div>

                                        {/* Previous stories list */}
                                        {[1, 2, 3].map((item) => (
                                                <div
                                                        key={item}
                                                        className="skeleton-card"
                                                        style={{ padding: '1rem', display: 'flex', gap: '12px', alignItems: 'center' }}
                                                >
                                                        <SkeletonElement type="rect" width="70px" height="70px" style={{ borderRadius: '10px' }} />
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                                                <SkeletonElement type="title" width="85%" height="18px" />
                                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                                        <SkeletonElement type="pill" width="50px" height="18px" />
                                                                        <SkeletonElement type="pill" width="60px" height="18px" />
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}

                                        {/* Rating preview card */}
                                        <div className="skeleton-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                <SkeletonElement type="text" width="80%" height="16px" />
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                <SkeletonElement key={star} type="circle" width="24px" height="24px" />
                                                        ))}
                                                </div>
                                                <SkeletonElement type="button" width="100%" height="36px" style={{ marginTop: '0.5rem' }} />
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default BlogSectionSkeleton;
