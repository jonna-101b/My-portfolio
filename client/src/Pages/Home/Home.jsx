import FrontPreview from './Components/FrontPreview';
import AboutPreview from './Components/AboutPreview';
import SkillsPreview from './Components/SkillsPreview';
import ProjectsPreview from './Components/ProjectsPreview';
import TestimonialsPreview from './Components/TestimonialsPreview';
import BlogSection from '../../Components/Blog/Blog';

function Home() {
        return (
                <div className="home">
                        <FrontPreview />

                        <AboutPreview />

                        <SkillsPreview />

                        <ProjectsPreview />

                        <TestimonialsPreview />
                        
                        <BlogSection />
                </div>
        );
}

export default Home;