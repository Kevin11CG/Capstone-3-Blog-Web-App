if ( globalThis.history.replaceState ) {
    globalThis.history.replaceState( null, null, globalThis.location.href );
}

$( ".new-post-btn" ).on( "click", function ( e ) {    
    $( ".new-blog-post-input" ).toggleClass( "d-none" );    
} );

$( ".post-cancel-btn" ).on( "click", function ( e ) {
    $( ".new-blog-post-input" ).addClass( "d-none" );
} );

$( ".edit-btn" ).on( "click", function ( e ) {
    $( ".edit-blog-post-input" ).toggleClass( "d-none" );
} );

$( ".edit-cancel-btn" ).on( "click", function ( e ) {
    $( ".edit-blog-post-input" ).addClass( "d-none" );
} );