import styles from './footer.module.css';
import githubIcon from '../../assets/icons/github.svg';
import linkedInIcon from '../../assets/icons/linkedin.svg';
import xIcon from '../../assets/icons/x.svg';

function Footer() {
    return (
        <footer>
            <span>made by Zack Cornfield</span>
            <div className={styles.socialContainer}>
                <a href="www.linkedin.com/in/zack-cornfield-9a2902236">
                    <img src={linkedInIcon} alt="LinkedIn icon" />
                </a>
                <a href="https://github.com/ZackCornfield">
                    <img src={githubIcon} alt="Github icon" />
                </a>
            </div>
        </footer>
    )
}

export default Footer;
