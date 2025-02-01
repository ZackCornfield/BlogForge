import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../../components/Tag/Tag';
import Comments from '../../components/Comments/Comments';

import styles from './postpage.module.css';
import insertNewlines from '../../utils/insertNewLines';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

function PostPage() {
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const { title } = useParams();

    useEffect(() => {
        try {
            const getPost = async () => {
                if (typeof title !== 'string') {
                    setError(`Invalid Title, type is ${typeof title}`); 
                    return;
                }
                const formattedTitle = title.replaceAll('-', ' ');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${formattedTitle}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders()
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setPost(data);
                } else {
                    setError(data.message);
                }

                data.content = insertNewlines(data.content);
            }
            getPost();
        } catch (err) {
            setError(err.message);
        }
    }, [title])

    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <>
            <main>
                <article className={styles.post}>
                    <div className={styles.cover}>
                        <img src={post.cover_url} alt="Cover image"/>
                    </div>
                    <div className={styles.info}>
                        <h2>{post.title}</h2>
                        <div className={styles.tags}>
                            <Tag type="date">{post.created_at}</Tag>
                            { post.tags?.map(tag => {
                                return <Tag key={tag.id} type="category">{tag.name}</Tag>
                            })}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <p>{post.content}</p>
                    </div>
                </article>
                <Comments post={post}/>
            </main>
        </>
    )
}

export default PostPage;
