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
import useArticlesReducer from '../../../../Hooks/useArticlesReducer';
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
        const { state: articles } = useArticlesReducer();

        useEffect(() => {
                const fetchData = async () => {
                        const data = [
                                { label: "Technical skills", value: technicalSkills.length },
                                { label: "Conceptual Skills", value: conceptualSkills.length },
                                { label: "Qualifications", value: qualifications.qualifications.length },
                                { label: "Projects", value: projects.projects.length },
                                { label: "Testimonials", value: testimonials.testimonials.length },
                                { label: "Articles", value: articles.articles.length }
                        ];

                        setChartData({
                                        labels: data.map((d) => d.label),
                                        datasets: [
                                                {label: "Series 1",
                                                data: data.map((d) => d.value),
                                                backgroundColor: [
                                                        "#FF6384",
                                                        "#36A2EB",
                                                        "#FFCE56",
                                                        "#4BC0C0",
                                                        "#9966FF",
                                                        "#FF9F40"
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
                                display: true,
                                text: "Custom Colored Bar Chart",
                                color: "#fff"
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
                                        color: "#fff",
                                        autoSkip: false, // ensures all labels show
                                        maxRotation: 0,
                                        minRotation: 0
                                },
                                grid: { color: "#444" }
                        },
                        y: {
                                ticks: { color: "#888888" },
                                grid: { color: "#444" }
                        }
                }
        };

        if (!chartData) return <p style={{ color: "#888888" }}>Loading chart...</p>;

        return (
                <div className="statistics-section">
                        <p className="title">Statistics</p>

                        <div className="chart">
                                <Bar data={chartData} options={options} />
                        </div>
                </div>
        );
}


export default StatisticsSection;