import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import api from '../api';

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSearchResults() {
            if (query) {
                try {
                    const { data } = await api.get('/search', { params: { q: query } });
                    setPosts(data);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        fetchSearchResults();
    }, [query]);

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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container border border-dark rounded">
            <h1 className="mb-4">Search Results for "{query}"</h1>
            <ul className="blog-posts-list">
                {posts.map(post => (
                    <li key={post.id}>
                        <div className="container-fluid blog-post border border-dark rounded p-3">
                            <h2><Link className="blog-link" to={`/${post.id}`}>{post.title}</Link></h2>
                            <p>{formatDate(post.datePosted, post.isEdited, post.dateEdited)}</p>
                        </div>
                        <hr className="blog-post-divider" />
                    </li>
                ))}
            </ul>
            {posts.length === 0 && <p>No posts found.</p>}
        </div>
    );
}

export default Search;