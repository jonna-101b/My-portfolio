import FrontSection from '../../Components/FrontSection/FrontSection';
import MainSection from './Components/MainSection';
import QualificationsSection from './Components/QualificationsSection';
import BlogSection from '../../Components/Blog/Blog';
import AboutImage from '../../assets/Images/About/2.svg';
import AboutImageLight from '../../assets/Images/About/2-light.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';


function About() {
        const pageTitle = "About Me";
        const pageIntro = "So, you want to know more about me?";
        const pageDescription = "Well, you're in the right place. This is the part of the site where I say a few things about who I am, what I do, and maybe even why I do it. Read on, and you might just get a better sense of the person behind the projects. Good luck—you might learn more than you bargained for."

        const { theme } = useContext(ThemeContext);
        
        return (
                <div className="about">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={theme === "dark" ? AboutImage : AboutImageLight} />

                        <MainSection />
                        
                        <QualificationsSection />

                        <BlogSection />
                </div>
        );
}

export default About;