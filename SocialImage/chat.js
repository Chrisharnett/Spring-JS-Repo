"use strict"

// Array to store comments for JSON.
let allComments = []
//Comment counter
let commentId = 0;

let likeCountDict = []

//Create a random user with AJAX
const getUser = async () => {
    const domain = "https://jsonplaceholder.typicode.com";
    const userResponse = await fetch (`$(domain)/users`);
    const user = await userResponse.json();

    return user.username;
    
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

const collect = () => {
    // Collect all the comment and subcomment children of the #latestComment class in an array.
    let comments = allComments.filter(c => c );
    const json = JSON.stringify(comments);
    localStorage.comments = json;
};

const timeStamp = () => {
    let d = new Date();
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
};

const collectLikes = () => {
    let likes = likeCountDict.filter(l => l);
    const jsonLikes = JSON.stringify(likes);
    localStorage.likes = jsonLikes;
};

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
    allComments.push(c);
    collect();
    

    // Update timestamp.
    setInterval(function () {
        $('.date' + c.getId()).text(c.getTimeString())
    }, 60000);

    // Like and update comment likes
    let l = addLikes(c.getId())
    $('#likeComment' + c.getId()).on("click", () => {   
        $('#likeCount' + c.getId()).text(l.add())
        c.setLikeCount($('#likeCount' + c.getId()).text())
        let like = {
            element: '#likeCount' + id,
            likeCount: c.likeCount
        }
        likeCountDict.push(like);
        collectLikes();
    });
    

    $("#up" + c.getId()).on("click", () => {
        // TODO: expand multi-line comment
    });

    $("#down" + c.getId()).on("click", () => {
        //TODO: Contract multi-line comment
    });

    let previous = commentId;
    // create subcomment listener to delete comment within 30 seconds
    $("#addSubComment" + c.getId()).on("contextmenu", () => {
        // right click to delete the comment.
        $("#commentBox" + c.getId()).remove();
        // remove the comment from likeCounts from local storage.
        allComments = allComments.filter( (comment) => comment.getId() != c.getId());
        collect();
        likeCountDict = likeCountDict.filter((l) => l.element != ('#likeCount' + c.getId()));
        collectLikes();
        
    });

    // Turn off delete listener and remove icon.
    setTimeout(function () {
        $("#addSubComment" + c.getId()).off("contextmenu");
        // update text in tooltip
        $("#addSubComment" + c.getId()).attr('title', 'Leave a comment.')
    }, 30000);

    // subcomment listener to create a subcomment on left click.
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
};

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
    };

    const jsonLikes = localStorage.likes;
    if (jsonLikes){
        likeCountDict = JSON.parse(jsonLikes);
    };
    for (let target of likeCountDict){
        let t = target.element;
        $(t).text(target.likeCount);
    };

    // TODO use AJAX to get a random user and change it with each comment.
    let user = getUser();


    // Display and update time
    $('#userDate').text((new Date().toLocaleString()));
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

    