import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeletons.css';

/**
 * Admin Table Rows Skeleton (List view)
 */
export function AdminTableSkeleton({ rows = 5 }) {
        return (
                <div className="admin-table-skeleton" aria-label="Loading table records">
                        {Array.from({ length: rows }).map((_, index) => (
                                <div key={index} className="sk-row">
                                        <SkeletonElement type="circle" width="32px" height="32px" isAdmin />
                                        <SkeletonElement type="text" width="35%" height="15px" isAdmin style={{ margin: 0 }} />
                                        <SkeletonElement type="pill" width="100px" height="22px" isAdmin />
                                        <SkeletonElement type="text" width="18%" height="13px" isAdmin style={{ margin: 0 }} />
                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                                                <SkeletonElement type="circle" width="28px" height="28px" isAdmin />
                                                <SkeletonElement type="circle" width="28px" height="28px" isAdmin />
                                                <SkeletonElement type="circle" width="28px" height="28px" isAdmin />
                                        </div>
                                </div>
                        ))}
                </div>
        );
}

/**
 * Admin Cards Grid Skeleton
 */
export function AdminGridSkeleton({ count = 6 }) {
        return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', width: '100%' }}>
                        {Array.from({ length: count }).map((_, index) => (
                                <div
                                        key={index}
                                        className="admin-skeleton-card"
                                        style={{ padding: '1.25rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                                >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <SkeletonElement type="circle" width="36px" height="36px" isAdmin />
                                                <SkeletonElement type="pill" width="70px" height="20px" isAdmin />
                                        </div>
                                        <SkeletonElement type="title" width="80%" height="20px" isAdmin />
                                        <SkeletonElement type="text" width="100%" height="13px" isAdmin />
                                        <SkeletonElement type="text" width="65%" height="13px" isAdmin />
                                        <div style={{ borderTop: '1px solid var(--admin-skeleton-border, rgba(255,255,255,0.05))', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <SkeletonElement type="text" width="80px" height="12px" isAdmin style={{ margin: 0 }} />
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                        <SkeletonElement type="circle" width="26px" height="26px" isAdmin />
                                                        <SkeletonElement type="circle" width="26px" height="26px" isAdmin />
                                                </div>
                                        </div>
                                </div>
                        ))}
                </div>
        );
}

/**
 * Admin Dashboard Profile Section Skeleton
 */
export function AdminProfileSectionSkeleton() {
        return (
                <div
                        className="admin-skeleton-card"
                        style={{ padding: '2rem', borderRadius: '20px', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                        aria-label="Loading dashboard profile"
                >
                        <SkeletonElement type="avatar" width="100px" height="100px" isAdmin />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                <SkeletonElement type="pill" width="150px" height="22px" isAdmin />
                                <SkeletonElement type="title" width="220px" height="32px" isAdmin />
                                <SkeletonElement type="text" width="75%" height="14px" isAdmin />
                                <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                                        <SkeletonElement type="text" width="140px" height="12px" isAdmin />
                                        <SkeletonElement type="text" width="120px" height="12px" isAdmin />
                                </div>
                        </div>
                </div>
        );
}

/**
 * Admin Dashboard Statistics Donut Skeleton
 */
export function AdminStatisticsSkeleton() {
        return (
                <div
                        className="admin-skeleton-card"
                        style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        aria-label="Loading distribution statistics"
                >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <SkeletonElement type="title" width="180px" height="22px" isAdmin />
                                        <SkeletonElement type="text" width="220px" height="12px" isAdmin />
                                </div>
                                <SkeletonElement type="pill" width="90px" height="22px" isAdmin />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
                                <SkeletonElement type="circle" width="180px" height="180px" isAdmin style={{ border: '16px solid var(--admin-skeleton-highlight)' }} />
                        </div>
                </div>
        );
}

/**
 * Admin Dashboard Activity Rows Skeleton
 */
export function AdminActivitySkeleton({ rows = 4 }) {
        return (
                <div
                        className="admin-skeleton-card"
                        style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        aria-label="Loading recent activities"
                >
                        <SkeletonElement type="title" width="150px" height="22px" isAdmin />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {Array.from({ length: rows }).map((_, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <SkeletonElement type="circle" width="34px" height="34px" isAdmin />
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                                        <SkeletonElement type="text" width="70%" height="13px" isAdmin style={{ margin: 0 }} />
                                                        <SkeletonElement type="text" width="35%" height="10px" isAdmin style={{ margin: 0 }} />
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

/**
 * Admin Dashboard Notifications Skeleton
 */
export function AdminNotificationsSkeleton({ rows = 3 }) {
        return (
                <div
                        className="admin-skeleton-card"
                        style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        aria-label="Loading notifications"
                >
                        <SkeletonElement type="title" width="170px" height="22px" isAdmin />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {Array.from({ length: rows }).map((_, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <SkeletonElement type="circle" width="34px" height="34px" isAdmin />
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                                        <SkeletonElement type="text" width="60%" height="13px" isAdmin style={{ margin: 0 }} />
                                                        <SkeletonElement type="text" width="30%" height="10px" isAdmin style={{ margin: 0 }} />
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

/**
 * Admin Dashboard Viewer Reactions Skeleton
 */
export function AdminReactionsSkeleton() {
        return (
                <div
                        className="admin-skeleton-card"
                        style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        aria-label="Loading reactions"
                >
                        <SkeletonElement type="text" width="130px" height="14px" isAdmin />
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <SkeletonElement type="title" width="60px" height="36px" isAdmin />
                                <SkeletonElement type="text" width="40px" height="16px" isAdmin />
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                        <SkeletonElement key={star} type="circle" width="20px" height="20px" isAdmin />
                                ))}
                        </div>
                </div>
        );
}
