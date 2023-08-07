let commentId = 1;

const getUser = () => {
    return  fetch("https://jsonplaceholder.typicode.com/users")
                .then( response => response.json() )
                .then(user => {return user})
}

const updateTimes = (comment) => {
    let time = comment.makeTimeString()
    let date = ".date" + comment.id
    $(date).text(time + " ago " + comment.user+" said ");
}

const addCount = (comment) => {
    comment.addLike();
    let id = ".likeCount" + comment.id
    $(id).text(comment.likeCount);
}

const disLike = (comment) => {
    comment.decrementLike();
    let id = ".likeCount" + comment.id
    $(id).text(comment.likeCount);
}

const addSubComment= (comment) => {
    superComment = "commentbox" + comment.id;
    $(superComment).after("<div class='subCommentbox'>"+
        "<div id='daterow'><span class='date"+comment.id+"'>"+comment.user +"'s reply</span>"+
        "<label for='newComment'></label>"+
        "<input type='text' id='newComment' placeholder='Your comment goes here.'>"+
        "<input type='button' id='add_comment' value='Comment'><span></span></div>")
}

$( () => {
    let user = "ChrisDEFAULT";
    $('.user').text(user)
    let dateString = new Date().toDateString()
    $('.userDate').text(dateString)

    $('.heartPic').on("click", () => {

    })
        
    $('.picComment').on("click", () => {       
        let comment = new Comment($("#newComment").val(), user, commentId );
        commentId ++;
        comment.postComment();
        setInterval(updateTimes, 60000, comment);
        let up = ".up" + comment.id;
        $(up).on("click", () => {
            addCount(comment);
        })
        let down = ".down" + comment.id;
        $(down).on("click", () => {
            disLike(comment);
        });
        let addSubComment = ".addSubComment" + comment.id;
        $(addSubComment).on("click", () => {
            commentId ++;
            let user = "STEVEDEFAULT"
            addSubComment(comment, user);
        });
        $("#newComment").val("")
        $("#newComment").focus()
        });
    
    });

    