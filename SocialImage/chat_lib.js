class Comment {
  constructor (comment, user, id, previousCommentId=-1){
      this.comment = comment;
      this.user = user
      this.postTimestamp = new Date();
      this.id = id;
      this.previousCommentId = previousCommentId;
  }


  getTimeString = () => {
    let now = new Date();
    let timeString = ''
    let years = now.getFullYear() - this.postTimestamp.getFullYear();
    if (years > 0){
        timeString += years.toString() + " years ";
    };
    let months = now.getMonth() - this.postTimestamp.getMonth();
    if (months > 0){
        timeString += months.toString() + " months ";
    };
    let days = now.getDay() - this.postTimestamp.getDay();
    if (days > 0){
        timeString += days.toString() + " days ";
    };
    let hours = now.getHours() - this.postTimestamp.getHours();
    if (hours > 0){
        timeString += hours.toString() + "hours ";
    };
    let minutes = now.getMinutes() - this.postTimestamp.getMinutes();
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
      "</span> <span class=stats>" + 
      "<span id='likeCount" + this.id + "'>0</span>" + 
      "<span id='likeComment" + this.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + this.id + "' title='Leave a comment'>&#10133</span>" +
      "</span><div class='commentRow'><div class='comment'>" + this.comment +
      "</div><span class='likeIt'><span id='expand" + this.id + "' title='expand'>&#11014</span>"+
      "<span id='contract" + this.id + "' title='contract'>&#11015</span></span></div></div></div>"));
  }
  postSubComment(){
    $("#commentBox" + this.previousCommentId).after(
      ("<div class=subCommentBox><span id='connector'>&#8735;</span><div class='commentbox subcomment' id='commentBox" + this.id + 
      "'><div id='daterow'><span class='date" + this.id + "'>"+
      this.getTimeString() + " ago " + this.user +
      " said </span> <span class=stats>" + 
      "<span id='likeCount" + this.id + "'>0</span>" + 
      "<span id='likeComment" + this.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + this.id + "' title='Leave a comment'>&#10133</span>" +
      "</span><div class='commentRow'><div class='comment'>" + this.comment +
      "</div><span class='likeIt'><span id='expand" + this.id + "' title='expand'>&#11014</span>"+
      "<span id=contract'" + this.id + "' title='contract'>&#11015</span>"+"</span></div></div></div></div>"));
    
    $(this).css('left', '+=' + 60);
    // if ($(this).previous().attr('class')){
    //   $(this).next('connector').css('height', '+=' + 40);
    // }
  }
  
}
class SubComment extends Comment{
  constructor(comment, user, id, previousCommentId) {
    super(comment, user, id);
    this.previousCommentId = previousCommentId
  }
  
}
        