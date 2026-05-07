import { Link, useNavigate } from 'react-router';

function Header() {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.q.value;
        navigate(`/search?q=${query}`);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Kevin Green</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="btn btn-outline-light" to="/new">New Post</Link>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" name="q" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Header;