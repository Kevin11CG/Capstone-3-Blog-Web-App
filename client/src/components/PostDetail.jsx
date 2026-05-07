import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import api from '../api';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const { data } = await api.get(`/posts/${id}`);
                setPost(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.status === 404 ? 'Post not found' : err.message);
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    const formatDate = (date, edited, editDate) => {
        const d = new Date(date);
        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
        const day = d.getDate();
        const year = d.getFullYear();
        let str = `Posted ${time} · ${month} ${day}, ${year}`;
        if (edited) {
            const ed = new Date(editDate);
            const etime = ed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            const emonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][ed.getMonth()];
            const eday = ed.getDate();
            const eyear = ed.getFullYear();
            str += ` | Edited ${etime} · ${emonth} ${eday}, ${eyear}`;
        }
        return str;
    };

    const handleDelete = async () => {
        if (globalThis.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}`);
                globalThis.location.href = '/';
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="container border border-dark rounded">
            <h1>{post.title}</h1>
            <p>{formatDate(post.datePosted, post.isEdited, post.dateEdited)}</p>
            <p className="blog-content">{post.content}</p>
            <div className="d-flex mb-3">
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Post</button>
                <Link type="button" className="edit-btn btn btn-outline-primary ms-2" to={`/${id}/edit`}>Edit Post</Link>
            </div>
        </div>
    );
}

export default PostDetail;