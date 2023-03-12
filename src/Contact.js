import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './HomePage.module.css';
import {faEnvelope, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin} from "@fortawesome/free-brands-svg-icons";

const Contact = ()=>{
    return (
        <div className={classes.contact}>
            <div className = {classes.container}>
                <div className={classes.row}>
                    <div className={classes.contact_left} id = "left_contact">
                        <h1 className={classes.sub_title}>Contact Me</h1>
                        <p><FontAwesomeIcon icon={faEnvelope} style = {{marginRight:"15px"}}></FontAwesomeIcon>contact@gmail.com</p>
                        <p><FontAwesomeIcon icon={faPaperPlane} style = {{marginRight:"15px"}}></FontAwesomeIcon>+91 1234567809</p>
                        <div className={classes.social_icons}>
                            <a href="https://www.linkedin.com/in/mahendar-prakash-416504253/">
                                <FontAwesomeIcon icon={faLinkedin}/>
                            </a>
                            
                        </div>
                       
                    </div>
                    <div className={classes.contact_right}>
                        <form>
                            <input type = "text" name = "Name" placeholder="Your Name" required/>
                            <input type="email" name="email" placeholder="Your Email" required/>
                            <textarea name="Message" rows = "6" placeholder="Your Message"></textarea>
                            <button type="submit" className = {classes.btn2}>Submit</button>
                        </form>
                        <span id = "msg"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;