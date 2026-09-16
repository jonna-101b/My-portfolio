import useTestimonialsReducer from '../../../../Hooks/useTestimonialsReducer';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { AdminReactionsSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/ViewerReactionsSection.css';

function ViewerReactionsSection() {
        const { state } = useTestimonialsReducer();
        const loading = state?.loading;
        const testimonials = state?.testimonials || [];

        if (loading) {
                return <AdminReactionsSkeleton />;
        }
        
        const reviewCount = testimonials.length;
        const validRatings = testimonials
                .map(t => Number(t?.rating))
                .filter(r => !isNaN(r) && r > 0);

        const averageRating = validRatings.length > 0
                ? (validRatings.reduce((a, b) => a + b, 0) / validRatings.length).toFixed(1)
                : (testimonials.length > 0 ? "5.0" : "0.0");

        const numericAvg = parseFloat(averageRating);

        return (
                <div className="viewer-reactions-card">
                        <div className="reactions-header">
                                <span className="reactions-title">VIEWER REACTIONS</span>
                        </div>

                        <div className="reactions-score-row">
                                <div className="score-display">
                                        <span className="main-score">{averageRating}</span>
                                        <span className="max-score">/5.0</span>
                                </div>

                                <div className="stars-group">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                                if (numericAvg >= star) {
                                                        return <StarIcon key={star} className="star-icon filled" />;
                                                } else if (numericAvg >= star - 0.5) {
                                                        return <StarHalfIcon key={star} className="star-icon filled" />;
                                                } else {
                                                        return <StarIcon key={star} className="star-icon" style={{ opacity: 0.2 }} />;
                                                }
                                        })}
                                </div>
                        </div>

                        <div className="reactions-count-row">
                                <span className="reviews-count">{reviewCount} {reviewCount === 1 ? "REVIEW" : "REVIEWS"}</span>
                        </div>
                </div>
        );
}

export default ViewerReactionsSection;
