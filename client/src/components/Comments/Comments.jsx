import styles from './comments.module.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Tag from '../Tag/Tag';
import Error from '../Error/Error';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

function Comments({ post }) {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getComments = async () => {
        if (!post || !post.title) {
            setIsLoading(true);
            return;
        }

        try {
            const formattedTitle = post.title.replaceAll('-', ' ');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${formattedTitle}/comments`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    ...getAuthHeaders()
                }
            });
            const data = await response.json();
            if (response.ok) {
                setComments(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getComments();
    }, [post]);

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!post || !post.title) {
            setError('Post title is undefined');
            return;
        }

        try {
            const formattedTitle = post.title.replaceAll('-', ' ');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${formattedTitle}/comments`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ content: newComment, post_id: post.id, username: user.username })
            });
            const data = await response.json();
            if (response.ok) {
                setNewComment("");
                getComments(); // Re-fetch comments after adding a new comment
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (isLoading) {
        return <p>Loading comments...</p>;
    }

    return (
        <>
            <section className={styles.commentsWrapper}>
                <div className={styles.commentCreatorWrapper}>
                    <div className={styles.commentCreator}>
                        <h3>Leave a comment</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="comment">Message</label>
                            <textarea required name="comment" id="comment" value={newComment} onChange={handleChange}></textarea>
                            <button type="submit" className="highlight">Comment</button>
                        </form>
                    </div>
                </div>
                <div className={styles.commentsContainer}>
                    <h3>Comments ({comments.length}) </h3>
                    <div className={styles.comments}>
                        {comments.map(comment => {
                            return (
                                <Comment key={comment.id} username={comment.user} date={comment.created_at} content={comment.content} />
                            );
                        })}
                        {comments.length === 0 && <p>No comments yet...</p>}
                    </div>
                </div>
            </section>
            {error ? <Error message={error} /> : null}
        </>
    );
}

function Comment({ username, date, content }) {
    return (
        <div className={styles.comment}>
            <div className={styles.commentInfo}>
                <span>{username}</span>
                <Tag type="date">{date}</Tag>
            </div>
            <div className={styles.commentContent}>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default Comments;
