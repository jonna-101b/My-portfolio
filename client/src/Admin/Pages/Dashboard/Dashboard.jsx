import TopView from '../../Components/TopView/TopView';
import ProfileSection from './Components/ProfileSection';
import QuickActionsSection from './Components/QuickActionsSection';
import StatisticsSection from './Components/StatisticsSection';
import PortfolioLinkSection from './Components/PortfolioLinkSection';
import RecentActivitySection from './Components/RecentActivitySection';
import RecentNotificationsSection from './Components/RecentNotificationsSection';
import './Dashboard.css';


function Dashboard() {
        return (
                <div className="dashboard">
                        <TopView  page={"Dashboard"}/>

                        <div className="content">
                                <div className="dash-main">
                                        <ProfileSection />

                                        <QuickActionsSection />

                                        <StatisticsSection />
                                </div>

                                <div className="dash-side">
                                        <PortfolioLinkSection />

                                        <RecentActivitySection />

                                        <RecentNotificationsSection />
                                </div>
                        </div>
                </div>
        );
}

export default Dashboard;