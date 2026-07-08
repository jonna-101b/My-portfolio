import FrontSection from '../../Components/FrontSection/FrontSection';
import ArticlesImage from '../../assets/Images/About/2.svg';


function Articles() {
        const pageTitle = "Articles";
        const pageIntro = "Words Worth Sharing";
        const pageDescription = "Sometimes I write things—thoughts, ideas, lessons, or just observations I can't keep to myself. But this isn't just a solo stream of consciousness—these are pieces from me and other brilliant minds I've crossed paths with. Read at your own pace; there's no quiz at the end (probably)."

        return (
                <div className="articles">
                        <FrontSection pageTitle={pageTitle} pageIntro={pageIntro} pageDescription={pageDescription} pageImage={ArticlesImage} />
                </div>
        );
}

export default Articles;