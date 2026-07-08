import FrontSection from '../../Components/FrontSection/FrontSection';
import ArticlesSection from '../../Components/Articles/Articles';
import ContactsImage from '../../assets/Images/About/2.svg';


function Contacts() {
        const pageTitle = "Contacts";
        const pageIntro = "Reach Out (I Swear I'm Friendly)";
        const pageDescription = "Got a project idea, question, or just want to say hi? I'd love to hear from you. Fill out the form, send a message, or try smoke signals (but email works best). Let's connect.";

        return (
                <div className="contacts-page">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={ContactsImage} />

                        <ArticlesSection />
                </div>
        );
}

export default Contacts;