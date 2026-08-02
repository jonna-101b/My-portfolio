import FrontSection from '../../Components/FrontSection/FrontSection';
import MainSection from "./Components/MainSection";
import NewTestimonial from "./Components/NewTestimonial";
import BlogSection from '../../Components/Blog/Blog';
import TestimonialsImage from '../../assets/Images/About/2.svg';


function Testimonials() {
        const pageTitle = "Testimonials";
        const pageIntro = "People Who Actually Liked Working with Me";
        const pageDescription = "Sure, I could say nice things about myself—but that would be too easy. Here's what other people have to say. Feedback, praise, and maybe a few surprises from folks I've worked with, collaborated alongside, or somehow impressed."

        return (
                <div className="testimonials">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={TestimonialsImage} />

                        <MainSection />

                        <NewTestimonial />

                        <BlogSection />
                </div>
        );
}

export default Testimonials;