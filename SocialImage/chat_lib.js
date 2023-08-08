class Comment {
  constructor (comment, user, id, previousCommentId, postTimeStamp){
      this.comment = comment;
      this.user = user
      this.postTimeStamp = postTimeStamp;
      this.id = id;
      this.previousCommentId = previousCommentId;
      this.likeCount = 0
  }

  setLikeCount(count) {
    this.likeCount = count;
  }


  getTimeString = () => {
    let now = new Date();
    let postDate = new Date(this.postTimeStamp)
    let timeString = ''
    let years = now.getFullYear() - postDate.getFullYear();
    if (years > 0){
        timeString += years.toString() + " years ";
    };
    let months = now.getMonth() - postDate.getMonth();
    if (months > 0){
        timeString += months.toString() + " months ";
    };
    let days = now.getDay() - postDate.getDay();
    if (days > 0){
        timeString += days.toString() + " days ";
    };
    let hours = now.getHours() - postDate.getHours();
    if (hours > 0){
        timeString += hours.toString() + "hours ";
    };
    let minutes = now.getMinutes() - postDate.getMinutes();
    timeString += minutes.toString() + " minutes";
    return  timeString + ' ago ' + this.user + ' said';
  }
  
  getId(){
    return this.id;
  }

  postComment(){
    $("#latestComment").after(
      ("<div class='commentbox' id='commentBox" + this.id + 
      "'><div id='daterow'><span class='date"+ this.id + "'>"+
      this.getTimeString() + 
      "</span> <span class='stats'>" + 
      "<span id='likeCount" + this.id + "'>0</span>" + 
      "<span id='likeComment" + this.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + this.id + "' title='Left click to leave a comment. Right click to delete comment.'>&#10133</span>" +
      "</span><div class='commentRow'></div><div class='comment'>" + this.comment +
      "</div><span class='commentView'><span id='expand" + this.id + "' title='expand'>&#11014</span>"+
      "<span id='contract" + this.id + "' title='contract'>&#11015</span></span></div></div>"));
  }
  postSubComment(){
    $("#commentBox" + this.previousCommentId).after(
      ("<div class='subCommentBox' id='commentBox" + this.id + "'><span id='connector'>&#8735;</span><div class='commentbox subComment'" + 
      "'><div id='daterow'><span class='date" + this.id + "'>"+
      this.getTimeString() + 
      "</span> <span class=stats>" + 
      "<span id='likeCount" + this.id + "'>0</span>" + 
      "<span id='likeComment" + this.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + this.id + "' title='Left click to leave a comment. Right click to delete comment.'>&#10133</span>" +
      "</span></div><div class='commentRow'><div class='comment'>" + this.comment +
      "</div><span class='commentView'><span id='expand" + this.id + "' title='expand'>&#11014</span>"+
      "<span id=contract'" + this.id + "' title='contract comment window'>&#11015</span>"+"</span></div></div></div>"));
    
    $(this).css('left', '+=' + 60);

  }
  
}

        