# Blog Web App

A modern blog application with a React frontend and Node.js/Express API backend. Create, edit, delete, and search your blog posts with a responsive, interactive interface.

## Features

- **Create Posts** - Write new blog posts with a title and content
- **Edit Posts** - Update existing posts and track edit history
- **Delete Posts** - Remove posts you no longer want
- **Search** - Search through all posts by title or content
- **Responsive Design** - Built with Bootstrap for mobile-friendly viewing
- **Timestamps** - Automatic post creation and edit timestamps
- **Single Page Application** - Fast, client-side routing with React Router

## Technologies Used

- **Backend**: Node.js with Express.js (REST API)
- **Frontend**: React with Vite, React Router
- **Styling**: Bootstrap 5, Custom CSS
- **Data Storage**: In-memory (no database, yet)

## Project Structure

```
Capstone-3-Blog-Web-App/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── Search.jsx
|   |   ├── api.js               # API export for frontend-backend communication
|   |   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
|   ├── eslint.config.js         # Frontend linting configuration
│   ├── index.html
|   ├── package-lock.json        # Frontend lockfile
│   ├── package.json             # Frontend dependencies
|   └── vite.config.js           # Frontend build configuration
├── server/                      # Express API backend
|   ├── index.js                 # API routes and handlers
|   ├── package-lock.json        # Backend lockfile
|   └── package.json             # Backend dependencies
├── .gitignore                   # Files to ignore in Git
├── package.json                 # Root package.json for workspace commands
└── README.md              
```

## Installation

1. **Clone or download the project** to your local machine.

2. **Install backend dependencies**:
   ```
   cd server
   npm install
   ```

3. **Install frontend dependencies**:
   ```
   cd ../client
   npm install
   ```

4. **Install nodemon if not already installed**:
   If you don't have nodemon installed, you can install it globally with `npm install -g nodemon`
   This will start the backend server with automatic restarts on code changes.

5. **Start the backend server and frontend development server**:
   ```
   cd ../
   npm run dev
   ```
   The API will be available at `http://localhost:8080` and the React app will be available at `http://localhost:5173`

## Usage

### Creating a Post
1. Click the **"New Post"** button in the navigation bar
2. Enter a title and content
3. Click **"Create Post"**

### Viewing Posts
- The homepage displays all blog posts in a list
- Click on any post title to view the full post

### Editing a Post
1. Navigate to the post you want to edit
2. Click the **"Edit Post"** button
3. Modify the title or content
4. Click **"Update Post"**

### Deleting a Post
1. Navigate to the post you want to delete
2. Click the **"Delete Post"** button
3. The post will be permanently removed

### Searching Posts
1. Enter a keyword in the search bar at the top
2. Click **"Search"** to find posts matching your query
3. Search works on both titles and content

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/posts` - Retrieve all posts
- `GET /api/posts/:id` - Retrieve a specific post by ID
- `POST /api/posts` - Create a new post (body: `{title, content}`)
- `PUT /api/posts/:id` - Update an existing post (body: `{title, content}`)
- `DELETE /api/posts/:id` - Delete a post by ID
- `GET /api/search?q=query` - Search posts by title or content

## Notes

- Posts are stored in memory, so they will be lost when the server restarts
- For a production application, consider implementing a database (PostgreSQL, MongoDB, MySQL, etc.)
- The app uses UUIDs to uniquely identify each post
- Form validation ensures that neither title nor content can be empty

## Future Enhancements

- Database integration for persistent storage
- User authentication and authorization
- Comments on posts
- Categories/tags for posts
- Pagination for post lists
- Rich text editing
