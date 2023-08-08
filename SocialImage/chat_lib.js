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
    let dateDiff = now.getTime() - postDate.getTime();
    let m = Math.floor((dateDiff / 1000 / 60) % 60);
    let h = Math.floor((dateDiff / 1000 /60 / 60) % 24);
     let years = now.getFullYear() - postDate.getFullYear();
     if (years > 0){
         timeString += years.toString() + " years ";
     };
     let nowMonth = now.getMonth();
     if (nowMonth < postDate.getMonth()){
       nowMonth += 11;
     }
     let months = nowMonth - postDate.getMonth();
     if (months > 0){
         timeString += months.toString() + " months ";
     };
     let nowDay = now.getDay();
     if (nowDay < postDate.getDay()){
       nowDay += 6;
     }
     let days = nowDay - postDate.getDay();
     if (days > 0){
         timeString += days.toString() + " days ";
    };
   
    return   h + ' hours:' + m + 'minutes ago ' + this.user + ' said';
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
      "</span></div>" + 
      "<div class='commentRow'><div class='comment' id='" + this.id + "'>" + this.comment +
      "</div><span class='commentView'><span id='contract" + this.id + "' title='contract'>&#11014</span>"+
      "<span id='expand" + this.id + "' title='expand'>&#11015</span></span></div></div>"));
  }
  postSubComment(){
    $("#commentBox" + this.previousCommentId).after(
      ("<div class='subCommentBox' id='commentBox" + this.id + "'>" +
      "<span id='connector'>&#8735;</span>" +
      "<div class='commentbox subComment'>" + 
      "<div id='daterow'><span class='date" + this.id + "'>"+
      this.getTimeString() + 
      "</span> <span class=stats>" + 
      "<span id='likeCount" + this.id + "'>0</span>" + 
      "<span id='likeComment" + this.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + this.id + "' title='Left click to leave a comment. Right click to delete comment.'>&#10133</span>" +
      "</span></div>" +
      "<div class='commentRow'><div class='comment' id='" + this.id + "'>" + this.comment +
      "</div><span class='commentView'><span id='contract" + this.id + "' title='contract comment window'>&#11014</span>"+
      "<span id='expand" + this.id + "' title='expand comment window'>&#11015</span>"+"</span></div></div></div>"));
    
    $(this).css('left', '+=' + 60);

  }
  
}

        