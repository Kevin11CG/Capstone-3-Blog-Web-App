$( document ).ready( function() {
    if ( globalThis.history.replaceState ) {
        globalThis.history.replaceState( null, null, globalThis.location.href );
    }

    const submitBtn = $( ".post-submit-btn" ),
        titleInput = $( ".post-title-input" ),
        contentInput = $( ".post-content-input" );
    submitBtn.on( "click", ( event ) => {
        if ( titleInput.val().trim() === "" || contentInput.val().trim() === "" ) {
            event.preventDefault();
            alert( "The title and content of the post cannot be empty." );
        }
    } );
} );