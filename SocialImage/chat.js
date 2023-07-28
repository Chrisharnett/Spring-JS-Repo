const getUser = () => {
    return  fetch("https://jsonplaceholder.typicode.com/users")
                .then( response => response.json() )
                .then(user => {return user})
}

$( () => {
    let user = "Chris";
        
    $('#add_comment').on ("click", () => {       
        let comment = new Comment($("#newComment").val(), user );
        comment.postComment()
        }); 
    });