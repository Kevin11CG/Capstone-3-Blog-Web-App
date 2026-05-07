import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Search from './components/Search';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<CreatePost />} />
                    <Route path="/:id" element={<PostDetail />} />
                    <Route path="/:id/edit" element={<EditPost />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
