const createComment = (comment, user, id) => {
        comment = comment;
        user = user;
        postTimestamp = new Date();
        id = id;
        nLikes = 'likeCount' + id;
        expand = 'expand' + id;
        contract = 'contract' + id;
        dateId = 'date' + id;
        likeComment = 'likeComment' + id;


        //private functions
        const getTimeString = () => {
            let now = new Date();
            let dateString = ''
            let years = now.getFullYear() - postTimestamp.getFullYear();
            if (years > 0){
                dateString += years.toString() + " years ";
            };
            let months = now.getMonth() - postTimestamp.getMonth();
            if (months > 0){
                dateString += months.toString() + " months ";
            };
            let days = now.getDay() - postTimestamp.getDay();
            if (days > 0){
                dateString += days.toString() + " days ";
            };
            let hours = now.getHours() - postTimestamp.getHours();
            if (hours > 0){
                dateString += hours.toString() + " ";
            };
            let minutes = now.getMinutes() - postTimestamp.getMinutes();
            dateString += minutes.toString() + " ";
            return  dateString;
        }

        return {
            // Create a new comment in the dom
            postComment(){
                $("#latestComment").after($
                    ("<div class='commentbox' id='commentBox" + commentId + 
                    "'><div id='daterow'><span class='"+dateId+"'>"+
                    getTimeString() + " ago " + user +
                    " said </span> <span class=stats>" + 
                    "<span id='" + nLikes + "'>0</span>" + 
                    "<span id='" + likeComment + "' title='Like this comment!'>&#128151</span>" +
                    "<span id='addSubComment" + id + "' title='Leave a comment'>&#10133</span>" +
                    "</span><div class='commentRow'><div class='comment'>" + comment +
                    "</div><span class='likeIt'><span id='" + expand + "' title='expand'>&#11014</span>"+
                    "<span id='" + contract + "' title='contract'>&#11015</span></span></div></div></div>"));
            },

            updateTime() {
                let time = getTimeString()
                $('#' + dateId).text(time + " ago " + comment.user +" said ");
            },

            postSubComment(oldId){
                $("#commentBox" + oldId).after($
                    ("<div class=subCommentBox><span id='connector'>&#8735;</span><div class='commentbox' id='commentBox" + commentId + 
                    "'><div id='daterow'><span class='"+dateId+"'>"+
                    getTimeString() + " ago " + user +
                    " said </span> <span class=stats>" + 
                    "<span id='" + nLikes + "'>0</span>" + 
                    "<span id='" + likeComment + "' title='Like this comment!'>&#128151</span>" +
                    "<span id='addSubComment" + id + "' title='Leave a comment'>&#10133</span>" +
                    "</span><div class='commentRow'><div class='comment'>" + comment +
                    "</div><span class='likeIt'><span id='" + expand + "' title='expand'>&#11014</span>"+
                    "<span id='" + contract + "' title='contract'>&#11015</span>"+"</span></div></div></div></div>"))
            },

            getId(){
                return id;
            }
        }
    }

//Comment counter
let commentId = 0;

//Create a random user with AJAX
const getUser = () => {
    return  fetch("https://jsonplaceholder.typicode.com/users")
                .then( response => response.json() )
                .then(user => {return user})
};

// Closure to add a like to the picture
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

//update subcomment layout
const updateLayout = () => {
    $(".subCommentBox").each(function() {
        if ($(this).next().attr('class')=='subCommentBox'){
            $(this).next().css('left', '+=' + 60);
        }
    });
}

$( () => {
    // TODO use AJAX to get a random user and change it with each comment.
    let user = "ChrisDEFAULT";

    //update time
    setInterval(timeUpdate, 1000);
   
    //Set the user name
    $('#user').text(user);
    
    // Set and update the likes (heart icon)
    let likes = addLikes();
    $('#heartPic').on("click", () => {
        $('#picLikeCount').text(likes.add());
    });
        
    $('#picComment').on("click", () => {
        //increment the comment id.
        commentId ++;      
        // create a new comment. 
        let comment = createComment($("#newComment").val(), user, commentId );
        comment.postComment();
        
        // Update timestamp.
        setInterval(comment.updateTime, 1000);

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
        
        let oldId = commentId;
        
        // create subcomment
        $("#addSubComment" + comment.getId()).on("click", () => {
            let id = commentId;
            let user = "STEVEDEFAULT";
            commentId ++;
            subComment = createComment($("#newComment").val(), user, commentId)
            subComment.postSubComment(oldId);
            $("#commentBox" + subComment.getId()).addClass('subComment');
            
            updateLayout();
            // Update timestamp.
            setInterval(subComment.updateTime, 1000);

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
                
            });
        
        //increment the comment id.
        commentId ++;
        // Clear and focus newComment box
        $("#newComment").val("")
        $("#newComment").focus()
        //Call change user at the end.
        });
    
    });

    