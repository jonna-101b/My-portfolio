import TopView from '../../Components/TopView/TopView';
import ProfileSection from './Components/ProfileSection';
import QuickActionsSection from './Components/QuickActionsSection';
import StatisticsSection from './Components/StatisticsSection';
import PortfolioLinkSection from './Components/PortfolioLinkSection';
import ViewerReactionsSection from './Components/ViewerReactionsSection';
import RecentActivitySection from './Components/RecentActivitySection';
import './Dashboard.css';

function Dashboard() {
        return (
                <div className="dashboard">
                        <TopView page="Dashboard" subtitle="Welcome back to your workspace." />

                        <div className="dashboard-content-grid">
                                <main className="dash-main-col">
                                        <ProfileSection />
                                        <QuickActionsSection />
                                        <StatisticsSection />
                                </main>

                                <aside className="dash-side-col">
                                        <PortfolioLinkSection />
                                        <ViewerReactionsSection />
                                        <RecentActivitySection />
                                </aside>
                        </div>
                </div>
        );
}

export default Dashboard;