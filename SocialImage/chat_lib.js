class Comment {
  constructor (comment, user){
      this.comment = comment;
      this.user = user
      this.postTimestamp = new Date();
      this.likeCount = 0
      this.timeString = this.makeTimeString();
  }
  
  postComment(){       
      $("#newComment").before($
          ("<div class='commentbox'><div id='daterow'><span class='date'>"+
          this.timeString + " ago "+
          this.user+
          " said </span> <span class=stats>" + 
          "<span class='likeCount'>"+ this.likeCount + "</span>" + 
          "<span class='likes'>&#128151</span>" +
          "<span class='addSubComment'>&#10133</span>" +
          "</span></div><div class='commentRow'><div class='comment'>" + this.comment +
          "</div><span class='likeIt'><span class='up'>&#11014</span><span class='down'>&#11015</span></span></div></div>"))
  }

  makeTimeString() {
      let now = new Date();
      let currentYear = now.getFullYear()
      let years = now.getFullYear() - this.postTimestamp.getFullYear();
      let months = now.getMonth() - this.postTimestamp.getMonth();
      let hours = now.getHours() - this.postTimestamp.getHours();
      let minutes = now.getMinutes() - this.postTimestamp.getMinutes();
      return years + " " + months + " " + hours + ":" + minutes;
  }
  updateTime() {
      return this.makeTimeString()
  }
  
  addLike() {
    this.likeCount += 1;
    updateCount()
  }
  decrementLike() {
    this.likeCount -+1;
    updateCount()
  }
  
}
        