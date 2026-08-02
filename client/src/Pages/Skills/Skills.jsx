import FrontSection from '../../Components/FrontSection/FrontSection';
import MainSection from "./Components/MainSection";
import BlogSection from '../../Components/Blog/Blog';
import AboutImage from '../../assets/Images/About/2.svg';


function Skills() {
        const pageTitle = "My Skills";
        const pageIntro = "What I Bring to the Table (Besides Snacks)";
        const pageDescription = "This is where I list the things I claim to be good at. From tools I've mastered to abilities I've picked up (sometimes the hard way), it's all here. If you're wondering what I bring to the table—technically and creatively—this is your cheat sheet. Proceed with curiosity."
        
        return (
                <div className="skills">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={AboutImage} />

                        <MainSection />

                        <BlogSection />
                </div>
        );
}

export default Skills;