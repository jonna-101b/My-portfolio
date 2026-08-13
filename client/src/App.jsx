import { ProfileContextProvider } from './Contexts/ProfileContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QualificationsContextProvider } from './Contexts/QualificationsContext';
import { TechnicalSkillsContextProvider } from './Contexts/TechnicalSkillsContext';
import { ConceptualSkillsContextProvider } from './Contexts/ConceptualSkillsContext';
import { ProjectsContextProvider } from './Contexts/ProjectsContext';
import { TestimonialsContextProvider } from './Contexts/TestimonialsContext';
import { BlogContextProvider } from './Contexts/BlogContext';
import { NotificationsContextProvider } from './Contexts/NotificationsContext';
import { ActivitiesContextProvider } from './Contexts/ActivitiesContext';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { AdminAuthContextProvider } from './Contexts/AdminAuthContext';
import Navbar from './Components/Navbar/Navbar';
import Contacts from './Components/Contacts/Contacts';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Skills from './Pages/Skills/Skills';
import Projects from './Pages/Projects/Projects';
// import Testimonials from './Pages/Testimonials/Testimonials';
// import Blog from './Pages/Articles/Articles';
// import PageContacts from './Pages/Contacts/Contacts';
import DottedBackground from './assets/Images/Background/DottedBackground';
import ServerNotification from './Components/ServerNotification/ServerNotification';
import Admin from './Admin/Admin';
import './App.css';
// import './Styles/Fonts.css';


function MainLayout() {
        return (
                <div className="main-layout">
                        <ServerNotification />
                        <Navbar />

                        <div className="pages">

                                <Routes>
                                        <Route path="/" element={<Home />} />

                                        <Route path="/about" element={<About />} />

                                        {/* <Route path="/skills" element={<Skills />} /> */}

                                        <Route path="/projects" element={<Projects />} />

                                        <Route path="/projects/:projectId" element={<Projects />} />

                                        {/* <Route path="/testimonials" element={<Testimonials />} /> */}

                                        {/* <Route path="/blogs" element={<Blog />} /> */}

                                        {/* <Route path="/contacts" element={<PageContacts />} /> */}
                                </Routes>

                        </div>

                        <Contacts />

                        <Footer />

                        <DottedBackground />
                </div>

        );
}


function App() {
        return (
                <ProfileContextProvider>
                        <TechnicalSkillsContextProvider>
                                <ConceptualSkillsContextProvider>
                                        <QualificationsContextProvider>
                                                <ProjectsContextProvider>
                                                        <TestimonialsContextProvider>
                                                                <BlogContextProvider>
                                                                        <NotificationsContextProvider>
                                                                                <ActivitiesContextProvider>

                                                                                                <ThemeContextProvider>
                                                                                                        <div className="app">
                                                                                                                <BrowserRouter>
                                                                                                                                        <AdminAuthContextProvider>
                                                                                                                                        <Routes>
                                                                                                                                                <Route path="/*" element={<MainLayout />} />

                                                                                                                                                <Route path="/admin/*" element={<Admin />} />
                                                                                                                                        </Routes>
                                                                                                                                        </AdminAuthContextProvider>
                                                                                                                                </BrowserRouter>
                                                                                                        </div>
                                                                                                </ThemeContextProvider>

                                                                                </ActivitiesContextProvider>
                                                                        </NotificationsContextProvider>
                                                                </BlogContextProvider>
                                                        </TestimonialsContextProvider>
                                                </ProjectsContextProvider>
                                        </QualificationsContextProvider>
                                </ConceptualSkillsContextProvider>
                        </TechnicalSkillsContextProvider>
                </ProfileContextProvider>
        )
}

export default App;