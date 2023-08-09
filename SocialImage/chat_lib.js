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
    
    let y = Math.floor((dateDiff/1000/60/60/24/365));
    timeString += y.toString().padStart(2, '0') + " ";

    let nowMonth = now.getMonth();
    if (nowMonth < postDate.getMonth()){
      nowMonth += 12;
    }
    let months = nowMonth - postDate.getMonth();
    timeString += months.toString().padStart(2, '0') + " ";
    let nowDay = now.getDate();
    let d = 0;
    if (nowDay > postDate.getDate() || nowDay == postDate.getDate()){
      d = nowDay - postDate.getDate();
    }
    else {
      daysInMonth = 31;
      if (postDate.getMonth == 3 || postDate.getMonth == 5 || postDate.getMonth == 8 || 
        postDate.getMonth == 10){
          daysInMonth = 30
      }
      else if(postDate.getMonth == 1){
          daysInMonth = 28
      }
      d = (daysInMonth + nowDay) - postDate.getDate;
      // If this year or the post year are leap years, add a day.
      if (now.getFullYear % 4 == 0 || postDate.getFullYear % 4 == 0){
        d += 1
      }
      // Add 1 day for every 4 years difference.
      if (y > 4){
        d += Math.floor(y / 4);
      }; 
    }

    timeString += d.toString().padStart(2, '0') + " ";
  let m = Math.floor((dateDiff / 1000 / 60) % 60);
  let h = Math.floor((dateDiff / 1000 /60 / 60) % 24);
  
  return   timeString += h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ' ago ' + this.user + ' said';
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

        