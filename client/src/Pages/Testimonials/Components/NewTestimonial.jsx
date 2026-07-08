import TestimonialImage from '../../../assets/Images/Testimonials/1.svg';
import UploadIcon from '../../../assets/Icons/image.png';
import "../Styles/NewTestimonial.css";

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

export default NewTestimonial;