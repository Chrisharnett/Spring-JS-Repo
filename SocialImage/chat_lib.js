class Comment {
  constructor (comment, user, id){
      this.comment = comment;
      this.user = user
      this.postTimestamp = new Date();
      this.timeString = this.makeTimeString();
      this.id = id;
  }
  
  postComment(){
    $("#latestComment").after($
      ("<div class='commentbox' id='commentBox" + this.Id + 
      "'><div id='daterow'><span class='date"+ this.Id+ "'>"+
      getTimeString() + " ago " + this.user +
      " said </span> <span class=stats>" + 
      "<span id=likeCount'" + this.id + "'>0</span>" + 
      "<span id=likeComment'" + this.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + this.id + "' title='Leave a comment'>&#10133</span>" +
      "</span><div class='commentRow'><div class='comment'>" + this.comment +
      "</div><span class='likeIt'><span id='expand" + this.id + "' title='expand'>&#11014</span>"+
      "<span id='contract" + this.id + "' title='contract'>&#11015</span></span></div></div></div>"));
  }

  getTimeString = () => {
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
  updateTime() {
      return this.makeTimeString();
  }
  
  addLike() {
    this.likeCount += 1;
  }
  getId(){
    return this.id;
  }
  
}
class SubComment extends Comment{
  constructor() {
    super(comment, user, id, oldId);
  }
  postComment(){
    $("#commentBox" + oldId).after(
      ("<div class=subCommentBox><span id='connector'>&#8735;</span><div class='commentbox' id='commentBox" + super.id + 
      "'><div id='daterow'><span class='date" + super.id + "'>"+
      getTimeString() + " ago " + user +
      " said </span> <span class=stats>" + 
      "<span id='likeCount" + super.id + "'>0</span>" + 
      "<span id='likeComment" + super.id + "' title='Like this comment!'>&#128151</span>" +
      "<span id='addSubComment" + super.id + "' title='Leave a comment'>&#10133</span>" +
      "</span><div class='commentRow'><div class='comment'>" + comment +
      "</div><span class='likeIt'><span id='expand" + super.id + "' title='expand'>&#11014</span>"+
      "<span id=contract'" + super.id + "' title='contract'>&#11015</span>"+"</span></div></div></div></div>"))
  }
}
        