import styles from './postpreview.module.css';

import { useState, useEffect } from 'react';

import Tag from '../Tag/Tag';
import Loader from '../Loader/Loader';
import Error from '../../components/Error/Error';

import { getAuthHeaders } from '../../utils/getAuthHeaders';

function PostPreview({ category, query }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        ...getAuthHeaders(),
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    result.forEach(post => {
                        post.content = post.content.slice('0', '300');
                    })
                    setError(null);
                    setPosts(result);
                    setFilteredPosts(result);
                } else {
                    setError('Error fetching posts: ' + result.message);
                }

                setIsLoading(false);
            }

            fetchPosts();
        } catch (err) {
            setError(err)
        }

    }, [])

    useEffect(() => {
        const regex = new RegExp(`.*${query}.*`, 'i');
        let filteredPosts = posts.filter(post => post.title.match(regex));

        if (category != "default") {
            filteredPosts = filteredPosts.filter(post => post.tags.some(e => e.name == category))
        }

        setFilteredPosts(filteredPosts);
    }, [query, category, posts])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={styles.postsPreviewContainer}>
            {filteredPosts.map(post => (
                <Card key={post.id} post={post}/>
            ))}
            { error ? <Error message={error} /> : null }
        </div>
    )
}

function Card({ post }) {
    const postPath = post.title ? `posts/${post.title.replaceAll(' ', '-')}` : '#';

    return (
        <a href={postPath} className={styles.previewWrapper}>
            <article className={styles.preview}>
                    <div className={styles.cover}>
                        <img src={post.cover_url} alt="Cover image" />
                    </div>
                    <div className={styles.content}>
                        <h3>{post.title}</h3>
                        <div className={styles.tags}>
                            <Tag type="date">{post.created_at}</Tag>
                            { post.tags.map(tag => <Tag key={tag.id} type="category">{tag.name}</Tag>)}
                        </div>
                        <p>{post.content}</p>
                    </div>
            </article>
        </a>
    )
}

export default PostPreview;
