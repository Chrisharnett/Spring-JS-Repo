"use strict"

// Array to store comments for JSON.
let allComments = []
//Comment counter
let commentId = 0;

//Create a random user with AJAX
const getUser = () => {
    return  fetch("https://jsonplaceholder.typicode.com/users")
                .then( response => response.json() )
                .then(user => {return user})
};

// Closure to add a like
const addLikes = () => {
    let count = 0;
    return {
        add() {
            count ++;
            return count;
        },
    }    
};

// Update the current time.
const timeUpdate = () =>{
    $('#userDate').text((new Date().toLocaleString()));
}

const store = (comment) =>{
    // Collect all the comment and subcomment children of the #latestComment class in an array. Make a function that's called.
    allComments.add(comment);
    const json = JSON.stringify(allComments);
    localStorage.comments = json;
}

$( () => {
    // TODO check for persistent json to make comments stay 'sessionstorage.' vs localstorage
    const json = localStorage.comments;
    if (json) {
        let allComments = JSON.parse(json);
        for (let comment of allComments) {
            if (comment.previousCommentId != -1) {
                comment.postSubComment;
            }
            else {
                comment.postComment;
            };
            
        };
        
    };

    // TODO use AJAX to get a random user and change it with each comment.
    let user = "ChrisDEFAULT";

    //update time
    setInterval(timeUpdate, 60000);
   
    // Display the user name
    $('#user').text(user);
    
    // Set and display the pic likes.
    let likes = addLikes();
    $('#heartPic').on("click", () => {
        $('#picLikeCount').text(likes.add());
    });
        
    $('#picComment').on("click", () => {
        //increment the comment id.
        commentId ++;      
        // create a new comment. 
        let comment = new Comment($("#newComment").val(), user, commentId );

        //Store the comment.
        store(comment);

        //Post the comment.
        comment.postComment();

        const commentJson = 
        
        // Update timestamp.
        setInterval(function () {
            $('.date' + comment.getId()).text(comment.getTimeString())
        }, 60000);

        // Like and update comment likes
        let l = addLikes()
        $('#likeComment' + comment.getId()).on("click", () => {   
            $('#likeCount' + comment.getId()).text(l.add())
        });

        $("#up" + comment.getId()).on("click", () => {
            // TODO: expand multi-line comment
        });

        $("#down" + comment.getId()).on("click", () => {
            //TODO: Contract multi-line comment
        });
        
        let previousCommentId = commentId;
        
        // create subcomment
        $("#addSubComment" + comment.getId()).on("click", () => {
            let user = "STEVEDEFAULT";
            commentId ++;
            let id = commentId;
            const subComment = new Comment($("#newComment").val(), user, id, previousCommentId)
            store(subComment);
            subComment.postSubComment();
            $("#commentBox" + subComment.getId()).addClass('subComment');

            // Update timestamp.
            setInterval(function () {
                $('.date' + subComment.getId()).text(subComment.getTimeString())
            }, 1000);

            // Like and update subComment likes
            let l = addLikes();
            $('#likeComment' + subComment.getId()).on("click", () => {
                // subComment.addLike()
                $('#likeCount' + subComment.getId()).text(l.add());
            });

            $("#up" + subComment.getId()).on("click", () => {
                // TODO: expand multi-line comment
            });

            $("#down" + subComment.getId()).on("click", () => {
                //TODO: Contract multi-line comment
            });

            // Clear and focus newComment box
            $("#newComment").val("")
            $("#newComment").focus()
            //Call change user at the end.  
                
        });

        // Clear and focus newComment box
        $("#newComment").val("")
        $("#newComment").focus()
        //Call change user at the end.

        });
    
    });

    