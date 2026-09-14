import { useMemo } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

// Hooks for all content types
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import useConceptualSkillsReducer from '../../../../Hooks/useConceptualSkillsReducer';
import useQualificationsReducer from '../../../../Hooks/useQualificationsReducer';
import useProjectsReducer from '../../../../Hooks/useProjectsReducer';
import useTestimonialsReducer from '../../../../Hooks/useTestimonialsReducer';
import useBlogReducer from '../../../../Hooks/useBlogReducer';

import '../Styles/StatisticsSection.css';

function StatisticsSection() {
        const { skills: technicalSkills = [] } = useTechnicalSkillsReducer();
        const { skills: conceptualSkills = [] } = useConceptualSkillsReducer(); 
        const { state: qualState } = useQualificationsReducer();
        const { state: projState } = useProjectsReducer();
        const { state: testState } = useTestimonialsReducer();
        const { state: blogState } = useBlogReducer();

        const qualifications = qualState?.qualifications || [];
        const projects = projState?.projects || [];
        const testimonials = testState?.testimonials || [];
        const blogs = blogState?.blogs || [];

        const categories = useMemo(() => [
                { id: 0, label: "Technical Skills", value: technicalSkills.length || 0, color: "#c6ff00" },
                { id: 1, label: "Conceptual Skills", value: conceptualSkills.length || 0, color: "#95d600" },
                { id: 2, label: "Qualifications", value: qualifications.length || 0, color: "#4ade80" },
                { id: 3, label: "Projects", value: projects.length || 0, color: "#38bdf8" },
                { id: 4, label: "Testimonials", value: testimonials.length || 0, color: "#a78bfa" },
                { id: 5, label: "Blogs", value: blogs.length || 0, color: "#fb7185" },
        ], [
                technicalSkills.length,
                conceptualSkills.length,
                qualifications.length,
                projects.length,
                testimonials.length,
                blogs.length
        ]);

        const totalItems = useMemo(() => {
                return categories.reduce((sum, item) => sum + item.value, 0);
        }, [categories]);

        // Filter out categories with 0 values for clean chart rendering if all zero provide dummy 1
        const chartData = useMemo(() => {
                const nonZero = categories.map((cat) => ({
                        id: cat.id,
                        value: cat.value > 0 ? cat.value : 0.0001,
                        label: `${cat.label} (${cat.value})`,
                        color: cat.color
                }));
                return nonZero;
        }, [categories]);

        return (
                <div className="statistics-card">
                        <div className="statistics-header">
                                <div className="header-info">
                                        <h3 className="card-title">Portfolio Distribution</h3>
                                        <p className="card-subtitle">Breakdown across all portfolio sections</p>
                                </div>
                                <span className="sync-badge">Live Metrics</span>
                        </div>

                        <div className="chart-main-layout">
                                <div className="donut-chart-container">
                                        <PieChart
                                                series={[
                                                        {
                                                                data: chartData,
                                                                innerRadius: 50,
                                                                outerRadius: 100,
                                                                paddingAngle: 4,
                                                                cornerRadius: 6,
                                                                startAngle: -90,
                                                                endAngle: 270,
                                                                highlightScope: { faded: 'global', highlighted: 'item' },
                                                        },
                                                ]}
                                                height={210}
                                                margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                slotProps={{
                                                        legend: { hidden: true },
                                                }}
                                                hideLegend
                                                sx={{
                                                        // Target the arcs to change their border (stroke)
                                                        '& .MuiPieChart-arc': {
                                                        stroke: '#363636', // Set your desired border color here
                                                        strokeWidth: 2,    // Adjust the border thickness
                                                        },
                                                }}
                                        />
                                        <div className="donut-center-info">
                                                <span className="center-count">{totalItems}</span>
                                                <span className="center-label">TOTAL ITEMS</span>
                                        </div>
                                </div>

                                <div className="chart-legend-grid">
                                        {categories.map((item) => (
                                                <div key={item.id} className="legend-item">
                                                        <div className="legend-left">
                                                                <span 
                                                                        className="legend-color-dot" 
                                                                        style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}66` }} 
                                                                />
                                                                <span className="legend-name">{item.label}</span>
                                                        </div>
                                                        <span className="legend-count">{item.value}</span>
                                                </div>
                                        ))}
                                </div>
                        </div>

                        <div className="statistics-footer-stats">
                                <div className="stat-block">
                                        <span className="stat-label">TOTAL CONTENT ENTRIES</span>
                                        <span className="stat-value">{totalItems}</span>
                                </div>
                                <div className="stat-block right">
                                        <span className="stat-label">ACTIVE MODULES</span>
                                        <span className="stat-value">{categories.length} Modules</span>
                                </div>
                        </div>
                </div>
        );
}

export default StatisticsSection;