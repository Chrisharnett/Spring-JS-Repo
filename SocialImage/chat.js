"use strict"

// Array to store comments for JSON.
let allComments = []
//Comment counter
let commentId = 0;

let likeCountDict = []

//Create a random user with AJAX
const getUser = () => {
    return  fetch("https://jsonplaceholder.typicode.com/users")
                .then( response => response.json() )
                .then(user => {return user})
};

// Closure to add a like
const addLikes = (id) => {
    let count = parseInt($('#likeCount' + id).text());
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
};

const collect = (comment) => {
    // Collect all the comment and subcomment children of the #latestComment class in an array. Make a function that's called.
    allComments.push(comment);
    const json = JSON.stringify(allComments);
    localStorage.comments = json;
};

const timeStamp = () => {
    let d = new Date();
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
};

const collectLikes = (id, likeCount) => {
    let l = {
        element: '#likeCount' + id,
        likeCount: likeCount
    }
    likeCountDict.push(l)
    
    const jsonLikes = JSON.stringify(likeCountDict);
    localStorage.likes = jsonLikes;
}

const createAComment = (comment, user, id, previousCommentId, postTimeStamp) => {   

    // create a new comment.
    let c = new Comment(comment, user, id, previousCommentId, postTimeStamp);
    
    // Post the comment
    if (c.previousCommentId != -1){
        c.postSubComment();
    }
    else{
        c.postComment();
    }
    
    //Store the comment.
    collect(c);
    

    // Update timestamp.
    setInterval(function () {
        $('.date' + c.getId()).text(c.getTimeString())
    }, 60000);

    // Like and update comment likes
    let l = addLikes(c.getId())
    $('#likeComment' + c.getId()).on("click", () => {   
        $('#likeCount' + c.getId()).text(l.add())
        c.setLikeCount($('#likeCount' + c.getId()).text())
        collectLikes(c.id, c.likeCount);
    });

    // Wastebasket to delete the comment within 30 secs.
    $(".wastebasket" + c.getId()).on('click',() => {
        // delete the comment.
        $("#commentBox" + c.getId()).remove();
        // remove the comment from the allComments array       
    });
    // Turn off delete listener and remove icon.
    setTimeout(function () {
        $(".wastebasket" + c.getId()).off();
        $(".wastebasket" + c.getId()).css('display', 'none');
    }, 30000);

    $("#up" + c.getId()).on("click", () => {
        // TODO: expand multi-line comment
    });

    $("#down" + c.getId()).on("click", () => {
        //TODO: Contract multi-line comment
    });

    let previous = commentId;
    // create subcomment listener
    $("#addSubComment" + c.getId()).on("click", () => {       
        let user = "STEVEDEFAULT";
        commentId ++;
        let id = commentId;
        createAComment($("#newComment").val(), user, id, previous, timeStamp()); 
            
    });

    // Clear and focus newComment box
    $("#newComment").val("")
    $("#newComment").focus()
    //Call change user at the end.
}

$( () => {
    // TODO check for persistent json to make comments stay 'sessionstorage.' vs localstorage
    const jsonComments = localStorage.comments;
    if (jsonComments) {
        let allComments = JSON.parse(jsonComments);
        for (let comment of allComments) {
            let d = new Date(comment.postTimeStamp);
            createAComment(comment.comment, comment.user, comment.id, comment.previousCommentId, d);
            if (comment.likeCount > 0){
                $('#likeCount' + comment.id).text(comment.likeCount);  
            }
                         
        };
        
    }

    const jsonLikes = localStorage.likes;
    if (jsonLikes){
        likeCountDict = JSON.parse(jsonLikes);
    }
    for (let target of likeCountDict){
        let t = target.element;
        $(t).text(target.likeCount);
    }

    // TODO use AJAX to get a random user and change it with each comment.
    let user = "ChrisDEFAULT";

    //update time
    setInterval(timeUpdate, 60000);
   
    // Display the user name
    $('#user').text(user);
    
    // Set and display the pic likes.
    let likes = addLikes(0);
    $('#heartPic').on("click", () => {
        $('#likeCount0').text(likes.add());
        collectLikes(0, $('#likeCount0').text())
    });
        
    $('#picComment').on("click", () => {
        //increment the comment id.
        commentId ++; 
        let d = new Date();
        let timestamp = d.getMonth() + "/" + d.getDay() + "/" + d.getYear() + " " + d.getHours() + ":" + d.getMinutes();
        let comment = createAComment($("#newComment").val(), user, commentId, -1, timeStamp());
        });
    
    });

    