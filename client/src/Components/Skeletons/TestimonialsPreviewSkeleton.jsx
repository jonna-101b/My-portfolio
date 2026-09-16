import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

function TestimonialsPreviewSkeleton() {
        return (
                <div className="testimonials-preview-skeleton" aria-label="Loading testimonials">
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <SkeletonElement type="title" width="200px" height="34px" />
                                <SkeletonElement type="text" width="360px" height="16px" />
                        </div>

                        {/* Testimonials Cards Grid */}
                        <div className="sk-testimonials-grid">
                                {[1, 2, 3].map((item) => (
                                        <div key={item} className="skeleton-card sk-testimonial-card">
                                                {/* Author Row */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                        <SkeletonElement type="avatar" width="56px" height="56px" />
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                                                <SkeletonElement type="title" width="140px" height="20px" />
                                                                <SkeletonElement type="text" width="100px" height="12px" />
                                                        </div>
                                                </div>

                                                {/* Quote Text */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
                                                        <SkeletonElement type="text" width="100%" height="14px" />
                                                        <SkeletonElement type="text" width="94%" height="14px" />
                                                        <SkeletonElement type="text" width="60%" height="14px" />
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default TestimonialsPreviewSkeleton;
