import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use( express.static( "public" ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

function Post ( id, title, datePosted, content, isEdited, dateEdited ) {
    this.id = id;
    this.title = title;
    this.datePosted = datePosted;
    this.content = content;
    this.isEdited = isEdited;
    this.dateEdited = dateEdited;
}

const allBlogPosts = [];
const abbrMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

app.get( "/", ( req, res ) => {
  res.render( "index.ejs", { posts: allBlogPosts, months: abbrMonths } );
});

app.post( "/", ( req, res ) => {
    const entry = req.body,
    currentDate = new Date(),
    post = new Post(crypto.randomUUID(), entry[ "title" ], currentDate, entry[ "content" ],  false, "");
    allBlogPosts.unshift(post);
    
    res.render( "index.ejs", { posts: allBlogPosts, months: abbrMonths } );
})

app.get( "/search", ( req, res ) => {
    console.log( req.query );
    const query = req.query.q.toLowerCase(),
    results = allBlogPosts.filter( p => p.title.toLowerCase().includes( query ) || p.content.toLowerCase().includes( query ) );
    res.render( "index.ejs", { posts: results, months: abbrMonths } );
});

app.get( "/:id", ( req, res ) => {
    const id = req.params.id,
    post = allBlogPosts.find( p => p.id === id );

    if ( post ) {
        res.render( "index.ejs", { blog: post, months: abbrMonths } );
    } else {
        res.status( 404 ).render( "index.ejs", { error: "Post not found" } );
    }
});

app.post( "/:id/edit", ( req, res ) => {
    const id = req.params.id,
    post = allBlogPosts.find( p => p.id === id );
    
    if ( post ) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.isEdited = true;
        post.dateEdited = new Date();
        res.redirect( `/${ id }` );
    } else {
        res.status( 404 ).send( "Post not found" );
    }
});

app.post( "/:id/delete", ( req, res ) => {
    const id = req.params.id,
    postIndex = allBlogPosts.findIndex( p => p.id === id );
    
    if ( postIndex >= 0 ) {
        allBlogPosts.splice( postIndex, 1 );
        res.redirect( "/" );
    } else {
        res.status( 404 ).send( "Post not found" );
    }
});

app.listen( port, () => {
  console.log( `Listening at port ${ port }` );
});