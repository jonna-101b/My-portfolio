import { useEffect, useRef, useState } from 'react';
import useTestimonialsReducer from '../../../Hooks/useTestimonialsReducer';
import TestimonialImage from '../../../assets/Images/Testimonials/1.svg';
import UploadIcon from '../../../assets/Icons/Home/image.png';
import QuoteShadowIcon from '../../../assets/Icons/Common/quote-shadow.png';
import "../Styles/TestimonialsPreview.css";


function NewTestimonial() {
        return (
                <div className="new-testimonial">
                        <div className="sub-content">
                                <div className="title">
                                        <p>Share Your Thoughts</p>
                                </div>

                                <div className="new-testimonial-message">
                                        <p>Whether it's a suggestions or praise, i would love to hear words from you - feel free to share your honest thoughts on me!</p>
                                </div>

                                <div className="image">
                                        <img src={ TestimonialImage } alt="Testimonial image" />
                                </div>
                        </div>

                        <div className="main-content">
                                        <form action="">
                                                <p className="input">
                                                        <label htmlFor="name">Name*:</label>
                                                        <input type="text" name="name" id="name" placeholder='e.g Jhon Doe'/>
                                                </p>

                                                <p className="input">
                                                        <label htmlFor="email">Email*:</label>
                                                        <input type="text" name="email" id="email" placeholder='e.g itIsJohnDoe@gmail.com'/>
                                                </p>

                                                <p className="input">
                                                        <label htmlFor="profession">Profession*:</label>
                                                        <input type="text" name="profession" id="profession" placeholder='e.g Software Developer'/>
                                                </p>

                                                <p className="input">
                                                        <label htmlFor="company">Company:</label>
                                                        <input type="text" name="company" id="company" placeholder='e.g Meta'/>
                                                </p>

                                                <p className="text-area">
                                                        <label htmlFor="testimony">Testimony*:</label>
                                                        <textarea name="testimony" id="testimony" placeholder='Share you thoughts here...'></textarea>
                                                </p>

                                                <div className="upload-image">
                                                        <p className="icon">
                                                                <img src={ UploadIcon } alt="Upload icon" />
                                                        </p>

                                                        <p className="drag">Drag and drop picture</p>

                                                        <p className="or">or</p>

                                                        <button>Browse</button>
                                                </div>

                                                <button type='submit'>Send message</button>

                                                <p className="reminder">* Indicates fields required.</p>
                                        </form>
                        </div>
                </div>
        );
}


function Testimonial({ testimonial }) {
        return (
                <div className="testimonial">
                        <p className="shadow">
                                <img src={QuoteShadowIcon} alt="Quote shadow icon" />
                        </p>

                        <div className="info">
                                <div className="image">
                                        <img src={ testimonial.picture }/>
                                </div>

                                <div className="details">
                                        <p className="name">{ testimonial.name }</p>

                                        <p className="position">{ testimonial.company ? `${testimonial.position} at ` + testimonial.company : testimonial.position}</p>
                                </div>
                        </div>

                        <div className="testimony">
                                <p>{ testimonial.testimony }</p>
                        </div>
                </div>
        );
}

function TestimonialsPreview() {
        const { state } = useTestimonialsReducer();
        const [ testimonials, setTestimonials ] = useState(state.testimonials);
        const testimonialsRef = useRef(null);
        const [ pagination, setPagination ] = useState(Array.from({ length: state.testimonials.length-2 }, (_, i) => i + 1));
        const [ currentIndex, setCurrentIndex ] = useState(state.testimonials.length ? 1 : 0); 

        const handleTestimonialsSlide = (newIndex) => {
                if (testimonialsRef.current && currentIndex !== newIndex) {
                        const slideBy = -(newIndex - 1) * 30;
                        testimonialsRef.current.style.transform = `translateX(${slideBy}vw)`;
                        setCurrentIndex(newIndex);
                }
        };        

        useEffect(() => {
                setTestimonials(state.testimonials);
                setPagination(Array.from({ length: state.testimonials.length-2 }, (_, i) => i + 1));
                setCurrentIndex(state.testimonials.length ? 1 : 0);
        }, [state.testimonials]);

        return (
                <div className="testimonials-preview">
                        <div className="title">
                                <p>Testimonials</p>
                        </div>

                        <div className="testimonials-message">
                                <p>Don't just take my word for it — see what others have to say</p>
                        </div>

                        <div className="testimonials">
                                <div className="wrapper" ref={testimonialsRef} >
                                        { testimonials.map((testimonial) => (<Testimonial testimonial={ testimonial } />)) }
                                </div>
                        </div>

                        <div className="pagination">
                                { pagination.map((index) => (
                                        <p className={currentIndex === index ? "focused" : null} key={index} onClick={() => {handleTestimonialsSlide(index)}} ></p>
                                )) }
                        </div>

                        {/* <NewTestimonial /> */}
                </div>
        );
}

export default TestimonialsPreview;