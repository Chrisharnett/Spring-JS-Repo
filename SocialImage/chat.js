const getUser = () => {
    return  fetch("https://jsonplaceholder.typicode.com/users")
                .then( response => response.json() )
                .then(user => {return user})
}
const updateTimes = (comment) => {
    let time = comment.makeTimeString()
    $(".date").text(time + " ago " + comment.user+" said ");
}

const addCount = (comment) => {
    comment.addCount()
    $(this).closest(".likeCount").text(comment.likeCount)
}

$( () => {
    let user = "Chris";
    $('.user').text(user)
    let dateString = new Date().toDateString()
    $('.userDate').text(dateString)
        
    $('#add_comment').on("click", () => {       
        let comment = new Comment($("#newComment").val(), user );
        comment.postComment()
        setInterval(updateTimes, 1000, comment)
        $('.newCommentClass').on("click", ".up", () => {
            addCount(comment);
        })
    
        $('.newCommentClass').on("click", ".down", () => {
            console.log($(this).parents(".likes"))
            $(this).parents(".likes").text("test");
        })
        });
    
    });

    