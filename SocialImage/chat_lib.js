class Comment {
    constructor (comment, user){
        this.comment = comment;
        this.user = user
        this.timestamp = new Date();
        this.likeCount = 0
    }
    postComment(){
        // let timePassed = new Date().getTime - this.timestamp.getTime;
        // let years = Math.floor(timePassed / (365*24*60*60*1000));
        // timePassed -= (years * (365*24*60*60*1000))
        let now = new Date();
        let currentYear = now.getFullYear()
        console.log(currentYear)
        console.log(now.getMonth)
        let years = now.getFullYear() - this.timestamp.getFullYear();
        let months = now.getMonth() - this.timestamp.getMonth();
        let hours = now.getHours() - this.timestamp.getHours();
        let minutes = now.getMinutes() - this.timestamp.getMinutes();
        let seconds = now.getSeconds() - this.timestamp.getSeconds();
        
        let timeString = years + " " + months + " " + hours + ":" + minutes;
        $("#newComment").before($
            ("<div class='commentbox'><div id='daterow'><span class='date'>"+
            timeString +" ago "+
            this.user+
            " said </span> <span class=stats>" + 
            "<span class='likeCount'>"+ this.likeCount + "</span>" + 
            "<span class='likes'>"+ " &#128151 " + "</span>" +
            "<span class='addSubComment'>"+ " &#10133 " + "</span>" +
            "</span></div><div class='commentRow'><div class='comment'>"+
            this.comment+
            "</div><span class='likeIt'><span class='up'>&#11014</span><span class='down'>&#11015</span></span></div></div>"))
    }
    addCount() {
        this.count = 0;
        const counter = evt => {
            this.count++;
        };
    }
        
    }