import FrontPreview from './Components/FrontPreview';
import AboutPreview from './Components/AboutPreview';
import SkillsPreview from './Components/SkillsPreview';
import ProjectsPreview from './Components/ProjectsPreview';
import TestimonialsPreview from './Components/TestimonialsPreview';
import ArticlesSection from '../../Components/Articles/Articles';

function Home() {
        return (
                <div className="home">
                        <FrontPreview />

                        <AboutPreview />

                        <SkillsPreview />

                        <ProjectsPreview />

                        <TestimonialsPreview />
                        
                        <ArticlesSection />
                </div>
        );
}

export default Home;