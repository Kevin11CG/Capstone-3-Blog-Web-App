import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import api from '../api';

function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            try {
                const { data } = await api.get(`/posts/${id}`);
                setTitle(data.title);
                setContent(data.content);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('Title and content cannot be empty');
            return;
        }
        try {
            await api.put(`/posts/${id}`, { title, content });
            navigate(`/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container blog-post-input border border-dark rounded position-fixed top-50 start-50 translate-middle">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        className="post-title-input form-control form-control-lg"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        autoFocus
                        autoComplete="off"
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="post-content-input form-control"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening..."
                        rows="7"
                    />
                </div>
                <div>
                    <button type="submit" className="post-submit-btn btn btn-primary">Update Post</button>
                    <button type="button" className="post-cancel-btn btn btn-secondary ms-2" onClick={() => navigate(`/${id}`)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
