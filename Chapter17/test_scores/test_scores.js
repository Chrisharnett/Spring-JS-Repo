"use strict"

const isInvalid = score => isNaN(score) || score < 1 || score > 100;

const getAverage = arr => {
    const total = arr.reduce( (tot, val) =>tot + val, 0);
    return total/arr.length;
}
const getLast = (arr, num = 3) => {
    const copy = [...arr];
    copy.reverse()
    return copy.slice(0, num)
}

$( () => {
    const scores = []
    $("#add_score").click( function() {
        const score = parseFloat($("#score").val());

        if(isInvalid(score)) {
            $(this).next().text("Score must be between 1 and 100.");
        }
        else {
            $(this).next().text("");
            scores.push(score);

            $("#high").text(Math.max(...scores));
            $("#low").text(Math.min(...scores));
            $("#last").text(getLast(scores).join(", "));
            $("avg").text(getAverage(scores).toFixed(2));
            $("#all").text(scores.join(", "));

        }

        $("#score").val("");
        $("#score").focus;
    })

    $("#score").focus()
});