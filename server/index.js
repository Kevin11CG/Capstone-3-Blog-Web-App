import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function Post( id, title, datePosted, content, isEdited, dateEdited ) {
    this.id = id;
    this.title = title;
    this.datePosted = datePosted;
    this.content = content;
    this.isEdited = isEdited;
    this.dateEdited = dateEdited;
}

const allBlogPosts = [];
const abbrMonths = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

app.get("/api/posts", (req, res) => {
    res.json(allBlogPosts);
});

app.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = allBlogPosts.find(p => p.id === id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.post("/api/posts", (req, res) => {
    const entry = req.body;
    if (!entry.title.trim() || !entry.content.trim()) {
        return res.status(400).json({ error: "Title and content cannot be empty" });
    }
    const currentDate = new Date();
    const post = new Post(crypto.randomUUID(), entry.title, currentDate, entry.content, false, "");
    allBlogPosts.unshift(post);
    res.status(201).json(post);
});

app.put("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = allBlogPosts.find(p => p.id === id);
    if (!req.body.title.trim() || !req.body.content.trim()) {
        return res.status(400).json({ error: "Title and content cannot be empty" });
    }
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.isEdited = true;
        post.dateEdited = new Date();
        res.json(post);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    const postIndex = allBlogPosts.findIndex(p => p.id === id);
    if (postIndex >= 0) {
        allBlogPosts.splice(postIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.get("/api/search", (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = allBlogPosts.filter(p => p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query));
    res.json(results);
});

app.listen( port, () => {
  console.log( `Listening at port http://localhost:${ port }` );
} );