import { Routes, Route } from 'react-router-dom';
import { NewContextProvider } from './Components/New/Context/NewContext';
import { EditContextProvider } from './Components/Edit/Context/EditContext';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Qualifications from './Pages/Qualifications/Qualifications';
import Skills from './Pages/Skills/Skills';
import Projects from './Pages/Projects/Projects';
import Testimonials from './Pages/Testimonials/Testimonials';
import Blog from './Pages/Blog/Blog';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import './Admin.css';


function Admin() {
        return (
                <div className="admin">
                        <Sidebar />

                        <div className="pages">
                                <NewContextProvider>
                                        <EditContextProvider>

                                                <Routes>
                                                        <Route path="dashboard" element={<Dashboard />} />
                                                        <Route path="skills" element={<Skills />} />
                                                        <Route path="qualifications" element={<Qualifications />} />
                                                        <Route path="projects" element={<Projects />} />
                                                        <Route path="testimonials" element={<Testimonials />} />
                                                        <Route path="blog" element={<Blog />} />
                                                        <Route path="profile" element={<Profile />} />
                                                        <Route path="settings/*" element={<Settings />} />
                                                </Routes>

                                        </EditContextProvider>
                                </NewContextProvider>
                        </div>
                </div>
        )
}

export default Admin;