# Blog Web App

A simple, elegant blog application built with Node.js and Express. Create, edit, delete, and search your blog posts with ease.

## Features

- **Create Posts** - Write new blog posts with a title and content
- **Edit Posts** - Update existing posts and track edit history
- **Delete Posts** - Remove posts you no longer want
- **Search** - Search through all posts by title or content
- **Responsive Design** - Built with Bootstrap for mobile-friendly viewing
- **Timestamps** - Automatic post creation and edit timestamps

## Technologies Used

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating, Bootstrap 5, jQuery
- **Styling**: Custom CSS with Bootstrap integration
- **Data Storage**: In-memory (no database, yet)

## Project Structure

```
├── index.js              # Main server and route handlers
├── package.json          # Project dependencies
├── public/
│   ├── scripts/
│   │   └── main.js       # Client-side JavaScript
│   └── styles/
│       └── main.css      # Custom styling
└── views/
    ├── index.ejs         # Main page and post display
    ├── input.ejs         # Create/edit post form
    └── partials/
        ├── header.ejs    # Navigation bar and HTML header
        └── footer.ejs    # Footer and scripts
```

## Installation

1. **Clone or download the project** to your local machine.

2. **Install dependencies**:
   `npm install`

3. **Start the server**:
   `npm start`, `node app.js`, or `nodemon app.js`
   The application will be available at `http://localhost:3000`

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
