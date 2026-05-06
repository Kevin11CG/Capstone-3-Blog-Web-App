import express from "express";

const app = express();
const port = 8080;

app.use( express.static( "public" ) );
app.use( express.urlencoded( { extended: true } ) );

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

app.get( "/", ( req, res ) => {
  res.render( "index.ejs", { posts: allBlogPosts, months: abbrMonths } );
} );

// Render form for creating a new post
app.get( "/new", ( req, res ) => {
    res.render( "input.ejs", { header: "Create New Post", submit: "Create Post" } );
} );

// Handle form submission for creating a new post
app.post( "/", ( req, res ) => {
    const entry = req.body;
    if ( !entry.title.trim() || !entry.content.trim() ) { 
        console.log( req.body );   
        return res.status( 400 );
    }
    const currentDate = new Date(),
        post = new Post( crypto.randomUUID(), entry.title, currentDate, entry.content,  false, "" );
    allBlogPosts.unshift( post );
    
    res.redirect( "/" );
} );

// Handle search query
app.get( "/search", ( req, res ) => {
    console.log( req.query );
    const query = req.query.q.toLowerCase(),
        results = allBlogPosts.filter( p => p.title.toLowerCase().includes( query ) || p.content.toLowerCase().includes( query ) );
    res.render( "index.ejs", { posts: results, months: abbrMonths } );
} );

// Render individual post page
app.get( "/:id", ( req, res ) => {
    const id = req.params.id,
        post = allBlogPosts.find( p => p.id === id );

    if ( post ) {
        res.render( "index.ejs", { blog: post, months: abbrMonths } );
    } else {
        res.status( 404 ).render( "index.ejs", { error: "Post not found" } );
    }
} );

// Render form for editing an existing post
app.get( "/:id/edit", ( req, res ) => {
    const id = req.params.id,
        post = allBlogPosts.find( p => p.id === id );

    if ( post ) {
        res.render( "input.ejs", { header: "Edit Post", submit: "Update Post", blog: post } );
    } else {
        res.status( 404 ).render( "index.ejs", { error: "Post not found" } );
    }
} );

// Handle form submission for editing an existing post
app.post( "/:id", ( req, res ) => {
    const id = req.params.id,
        post = allBlogPosts.find( p => p.id === id );
    
    if ( !req.body.title.trim() || !req.body.content.trim() ) {
        console.log( req.body );
        return res.status( 400 );
    }
    
    if ( post ) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.isEdited = true;
        post.dateEdited = new Date();
        res.redirect( `/${ id }` );
    } else {
        res.status( 404 ).send( "Post not found" );
    }
} );

// Handle deletion of a post
app.post( "/:id/delete", ( req, res ) => {
    const id = req.params.id,
        postIndex = allBlogPosts.findIndex( p => p.id === id );
    
    if ( postIndex >= 0 ) {
        allBlogPosts.splice( postIndex, 1 );
        res.redirect( "/" );
    } else {
        res.status( 404 ).send( "Post not found" );
    }
} );

app.listen( port, () => {
  console.log( `Listening at port http://localhost:${ port }` );
} );