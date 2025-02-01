import styles from './error.module.css';
import { useState, useRef } from 'react';
import { MdClose } from "react-icons/md";

function Error({ message }) {
    const errorRef = useRef(null);
    const [isDisplayed, setIsDisplayed] = useState(true);

    const hidePopup = () => {
        errorRef.current.classList.add(styles.disappear);
        setTimeout(() => {
            setIsDisplayed(false);
        }, 500);
    };

    // Ensure the message is a string
    const errorMessage = typeof message === 'string' ? message : message.toString();

    return (
        <>
            {isDisplayed && (
                <div ref={errorRef} className={styles.errorContainer}>
                    <MdClose onClick={hidePopup} className={styles.closeIcon} />
                    <p>{errorMessage}</p>
                </div>
            )}
        </>
    );
}

export default Error;
