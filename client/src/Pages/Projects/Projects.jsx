import FrontSection from '../../Components/FrontSection/FrontSection';
import MainSection from "./Components/MainSection";
import ArticlesSection from '../../Components/Articles/Articles';
import AboutImage from '../../assets/Images/Projects/projects.svg';


function Projects() {
        const pageTitle = "My Projects";
        const pageIntro = "Stuff I've Been Building";
        const pageDescription = "Here's a little collection of things I've brought to life—some for fun, some for work, and some just because I was curious to see if I could. Each project has its own story, a few challenges, and probably too many late-night tweaks. Scroll through, explore, and feel free to judge (nicely)."

        return (
                <div className="projects">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={AboutImage} />

                        <MainSection />

                        <ArticlesSection />
                </div>
        );
}

export default Projects;