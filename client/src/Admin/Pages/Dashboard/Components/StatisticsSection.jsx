import { useEffect, useState } from "react";
import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend  } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
// Components hook
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import useConceptualSkillsReducer from '../../../../Hooks/useConceptualSkillsReducer';
import useQualificationsReducer from '../../../../Hooks/useQualificationsReducer';
import useProjectsReducer from '../../../../Hooks/useProjectsReducer';
import useTestimonialsReducer from '../../../../Hooks/useTestimonialsReducer';
import useBlogReducer from '../../../../Hooks/useBlogReducer';
import '../Styles/StatisticsSection.css';


// Register required Chart.js components + the datalabels plugin
ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ChartDataLabels
);

function StatisticsSection() {
        const [chartData, setChartData] = useState(null);
        const { skills: technicalSkills } = useTechnicalSkillsReducer();
        const { skills: conceptualSkills } = useConceptualSkillsReducer(); 
        const { state: qualifications } = useQualificationsReducer();
        const { state: projects } = useProjectsReducer();
        const { state: testimonials } = useTestimonialsReducer();
        const { state: blogs } = useBlogReducer();

        useEffect(() => {
                const fetchData = async () => {
                        const data = [
                                { label: "Technical skills", value: technicalSkills.length },
                                { label: "Conceptual Skills", value: conceptualSkills.length },
                                { label: "Qualifications", value: qualifications.qualifications.length },
                                { label: "Projects", value: projects.projects.length },
                                { label: "Testimonials", value: testimonials.testimonials.length },
                                { label: "Blogs", value: blogs.blogs.length }
                        ];

                        setChartData({
                                        labels: data.map((d) => d.label),
                                        datasets: [
                                                {label: "Series 1",
                                                data: data.map((d) => d.value),
                                                backgroundColor: [
                                                                        "#6d7c34",
                                                                        "#7c8e35",
                                                                        "#8fa63c",
                                                                        "#a6bf45",
                                                                        "#b9d14f",
                                                                        "#c6ff00"
                                                ],
                                                borderWidth: 0,
                                                borderRadius: 8
                                                }
                                        ]
                                        });
                                };

                        fetchData();
        }, []);

        const options = {
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                        legend: {
                                display: false,
                        },
                        title: {
                                display: false
                        },
                        datalabels: {
                                anchor: "end",
                                align: "end",
                                color: "#888888",
                                font: {
                                weight: "bold"
                                },
                                formatter: (value) => value
                        }
                },
                scales: {
                        x: {
                                ticks: {
                                        color: "#ededed",
                                        autoSkip: false, // ensures all labels show
                                        maxRotation: 0,
                                        minRotation: 0
                                },
                                grid: { color: "rgba(255, 255, 255, 0.04)" }
                        },
                        y: {
                                ticks: { color: "#888888" },
                                grid: { color: "rgba(255, 255, 255, 0.04)" }
                        }
                }
        };

        if (!chartData) return <p style={{ color: "#888888" }}>Loading chart...</p>;

        return (
                <div className="statistics-section">
                        <div className="header-row">
                                <p className="title">Statistics</p>

                                <p className="subtitle">Content snapshot</p>
                        </div>

                        <div className="chart">
                                <Bar data={chartData} options={options} />
                        </div>
                </div>
        );
}


export default StatisticsSection;