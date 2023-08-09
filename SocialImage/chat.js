"use strict"

// Array to store comments for JSON.
let allComments = []
//Comment counter
let commentId = 0;

let likeCountDict = []

let currentUser = 'default'

//Create a random user with AJAX
const getUser = async () => {
    const domain = "https://jsonplaceholder.typicode.com";
    const r = await fetch(`${domain}/users/${Math.ceil(Math.random() * 10)}`)
    const user = await r.json();
    currentUser = user.username
    return currentUser;
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
    let likes = likeCountDict.filter(l => l != null);
    const jsonLikes = JSON.stringify(likes);
    localStorage.likes = jsonLikes;
};

const createAComment = async (comment, user, id, previousCommentId, postTimeStamp) => {   

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
        
        likeCountDict.push(id);
        collectLikes();
    });
    

    $("#contract" + c.getId()).on("click", () => {
        $('#' + c.getId()).css('white-space', 'nowrap');
    });

    $("#expand" + c.getId()).on("click", () => {
        $('#' + c.getId()).css('white-space', 'normal');
    });

    let previous = commentId;
    // create subcomment listener to delete comment within 30 seconds
    $("#addSubComment" + c.getId()).on("contextmenu", () => {
        // right click to delete the comment.
        $("#commentBox" + c.getId()).remove();
        // remove the comment from likeCounts from local storage.
        allComments = allComments.filter( (comment) => comment.getId() != c.getId());
        collect();
        likeCountDict = likeCountDict.filter((l) => l != c.getId());
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
        commentId ++;
        let id = commentId;
        createAComment($("#newComment").val(), $('#user').text(), id, previous, timeStamp()); 
            
    });

    // Clear and focus newComment box
    $("#newComment").val("")
    $("#newComment").focus()
    // Change user at the end.
    try{
        let user = await getUser();
        // Display the user name
        $('#user').text(user);
    }
    catch(e){
        $('#user').text('default');
    }
};

$( async () => {
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

    // TODO use AJAX to get a random user and change it with each comment.
    try{
        let user = await getUser();
        // Display the user name
        $('#user').text(user);
    }
    catch(e){
        $('#user').text('default');
    }
    

    // Display and update time
    $('#userDate').text((new Date().toLocaleString()));
    setInterval(timeUpdate, 60000);
    

    // Set and display the pic likes.
    let likes = addLikes(0);
    $('#heartPic').on("click", () => {
        $('#likeCount0').text(likes.add());
        likeCountDict.push(0);
        collectLikes(0, $('#likeCount0').text())
    });

    const jsonLikes = localStorage.likes;
    let storedLikes = ''
    if (jsonLikes){
        storedLikes = JSON.parse(jsonLikes);
    };
    localStorage.removeItem("likes");
    for (let id of storedLikes){
        if (id == 0){
            $('#heartPic').trigger('click')
        }
        else{
            $('#likeComment' + id).trigger('click');
        }
    };
        
    $('#picComment').on("click", () => {
        //increment the comment id.
        commentId ++; 
        let d = new Date();
        // let timestamp = d.getMonth() + "/" + d.getDay() + "/" + d.getYear() + " " + d.getHours() + ":" + d.getMinutes();
        createAComment($("#newComment").val(), $('#user').text(), commentId, -1, timeStamp());
        });
    
    });

    