import Link from "../../components/Link/Link";
import PostPreview from "../../components/PostPreview/PostPreview";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getAuthHeaders } from '../../utils/getAuthHeaders';

import styles from "./homepage.module.css";
import backgroundImage from "../../assets/images/homeBackground.jpg";
import Error from '../../components/Error/Error';

import { useState, useEffect } from "react";

function HomePage() {
    useDocumentTitle('home');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("default")
    const [query, setQuery] = useState("");

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/tags`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders(),
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setTags(data)
                } else {
                    setError('Error fetching tags: ', data.message);
                }
            }
            catch (err) {
                setError('Error: ' + err)
            }
        }
        getTags()
    }, [])

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <main>
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeMessage}>
                        <div className={styles.messageContainer}>
                            <h2>Welcome to <span>BlogForge</span></h2>
                        </div>
                        <div className={styles.action}>
                            <Link href="/register" isStyled={true}>Sign up now!</Link>
                        </div>
                    </div>
                    <div className={styles.welcomeImage}>
                        <img src={backgroundImage} alt="Coding hero image" />
                    </div>
                </div>
                <section className={styles.postPreviewWrapper}>
                    <h2>Available <span>blog</span> articles:</h2>
                    <div className={styles.filterContainer}>
                        <input type="text" name="query" id="query" onChange={handleQueryChange} placeholder="Search by title..." />
                        <select name="category" id="category" onChange={handleCategoryChange}>
                            <option value="default">All categories</option>
                            {tags.map(tag => {
                                return <option key={tag.id} value={tag.name}>{tag.name}</option>
                            })}
                        </select>
                    </div>
                    <PostPreview category={category} query={query} />
                </section>
                { error ? <Error message={error} /> : null }
            </main>
        </>
    )
}

export default HomePage;
