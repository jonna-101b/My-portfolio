import FrontSection from '../../Components/FrontSection/FrontSection';
import MainSection from "./Components/MainSection";
import BlogSection from '../../Components/Blog/Blog';
import ProjectImage from '../../assets/Images/Projects/projects.svg';
import ProjectImageLight from '../../assets/Images/Projects/projects-light.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';


function Projects() {
        const pageTitle = "My Projects";
        const pageIntro = "Stuff I've Been Building";
        const pageDescription = "Here's a little collection of things I've brought to life—some for fun, some for work, and some just because I was curious to see if I could. Each project has its own story, a few challenges, and probably too many late-night tweaks. Scroll through, explore, and feel free to judge (nicely)."

        const { theme } = useContext(ThemeContext);

        return (
                <div className="projects">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={theme === "dark" ? ProjectImage : ProjectImageLight} />

                        <MainSection />

                        <BlogSection />
                </div>
        );
}

export default Projects;